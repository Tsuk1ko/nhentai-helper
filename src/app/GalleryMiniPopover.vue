<template>
  <el-popover
    ref="popoverRef"
    v-model:visible="visible"
    :popper-class="popoverTransition ? 'popover-transition' : ''"
    :virtual-ref="virtualRef"
    virtual-triggering
    :placement="popoverPlacement"
    trigger="contextmenu"
    :width="popoverWidth"
    :hide-after="0"
  >
    <div
      v-if="gallery"
      class="gallery-mini-popover"
      :class="`lang-${settings.language}`"
      @wheel.prevent
    >
      <el-descriptions :title="title" :column="1">
        <template #extra>
          <el-button text size="small" @click="copyTitle">{{ t('common.copy') }}</el-button>
          <el-button
            :icon="CloseBold"
            circle
            text
            size="small"
            style="margin-left: 4px"
            @click="close"
          />
        </template>
        <el-descriptions-item>
          <template #label>
            <span class="info-label bold">{{ t('meta.id') }}</span>
          </template>
          <el-link type="primary" target="_blank" :underline="false" :href="galleryLink">{{
            gallery.id
          }}</el-link>
        </el-descriptions-item>
        <el-descriptions-item v-for="[type, tags] in groupedTags" :key="type">
          <template #label>
            <span class="info-label bold">{{ t(`meta.${type}`) }}</span>
          </template>
          <el-tag
            v-for="tag in limitTagLength(tags, 10)"
            :key="tag.id ?? tag.name"
            class="info-tag"
            :class="{ 'info-tag--pointer': !isLimitTag(tag) }"
            type="info"
            effect="dark"
            disable-transitions
            @click="() => openTagUrl(tag.url)"
          >
            <template v-if="isLimitTag(tag)">+{{ tag.count }}</template>
            <template v-else>
              <span class="bold">{{ tag.name }}</span
              >{{ tag.count ? ` | ${formatNumber(tag.count)}` : undefined }}
            </template>
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item v-if="gallery.num_pages">
          <template #label>
            <span class="info-label bold">{{ t('meta.page') }}</span>
          </template>
          <el-tag class="info-tag" type="info" effect="dark" disable-transitions>
            <span class="bold">{{ gallery.num_pages }}</span>
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item v-if="gallery.upload_date">
          <template #label>
            <span class="info-label bold">{{ t('meta.upload') }}</span>
          </template>
          {{ new Date(gallery.upload_date * 1000).toLocaleString() }}
        </el-descriptions-item>
      </el-descriptions>
      <div
        v-if="pageThumbs.length"
        v-infinite-scroll="addPageThumbLine"
        :infinite-scroll-distance="100"
        class="scroll-container"
        :style="{ height: `${pageThumbScrollHeight}px` }"
        @wheel.capture.stop="handleScrollWheel"
      >
        <div class="scroll-container-inner">
          <el-row :gutter="8">
            <el-col v-for="{ url, height } in pageThumbs" :key="url" :span="pageThumbsColSpan">
              <el-image :src="url" :style="{ 'min-height': `${height}px` }" />
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <div
      v-else
      v-loading="true"
      :style="{ height: '700px', maxHeight: '90vh' }"
      @wheel.prevent
    ></div>
  </el-popover>
</template>

<script setup lang="ts">
import { CloseBold } from '@element-plus/icons-vue';
import { GM_openInTab, GM_setClipboard } from '$';
import {
  ElButton,
  ElCol,
  ElDescriptions,
  ElDescriptionsItem,
  ElImage,
  ElLink,
  ElPopover,
  ElRow,
  ElTag,
  ElInfiniteScroll as vInfiniteScroll,
  vLoading,
} from 'element-plus';
import { groupBy, map } from 'lodash-es';
import { useI18n } from 'petite-vue-i18n';
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue';
import { showMessage } from '@/utils/elementPlus';
import logger from '@/utils/logger';
import { getCompliedThumbMediaUrlTemplate, getGallery, NHentaiImgExt } from '@/utils/nhentai';
import type { NHentaiGallery, NHentaiImage, NHentaiTag } from '@/utils/nhentai';
import { settings } from '@/utils/settings';

const POPOVER_MAX_WIDTH = 720;
const POPOVER_THUMB_MORE_COL_WIDTH = 640;

const TAG_TYPES = [
  'parody',
  'character',
  'tag',
  'artist',
  'group',
  'language',
  'category',
] as const;
const getTagSortIndex = (type: string) => {
  const index = TAG_TYPES.findIndex(t => t === type);
  return index === -1 ? 999 : index;
};

const { t } = useI18n();

const visible = ref(false);
const virtualRef = ref<HTMLElement>();
const popoverRef = ref<InstanceType<typeof ElPopover>>();
const popoverPlacement = ref<InstanceType<typeof ElPopover>['placement']>('right');
const popoverWidth = ref(0);
const popoverTransition = ref(false);

const gallery = ref<NHentaiGallery | null>(null);

const title = computed(() => {
  const t = gallery.value?.title;
  return t ? t.japanese || t.english || t.pretty : '';
});

const groupedTags = computed(() => {
  const tags = gallery.value?.tags;
  return tags
    ? Object.entries(groupBy(tags, 'type')).sort(
        ([a], [b]) => getTagSortIndex(a) - getTagSortIndex(b),
      )
    : [];
});

const galleryLink = computed(() => `${location.origin}/g/${gallery.value?.id}/`);

const pageThumbs = ref<Array<{ url: string; height: number }>>([]);
const pageThumbsColSpan = computed(() =>
  popoverWidth.value >= POPOVER_THUMB_MORE_COL_WIDTH ? 6 : 8,
);
const pageThumbsColNum = computed(() =>
  popoverWidth.value >= POPOVER_THUMB_MORE_COL_WIDTH ? 4 : 3,
);
const pageThumbWidth = computed(
  () => (popoverWidth.value - 24 - (pageThumbsColNum.value - 1) * 8) / pageThumbsColNum.value,
);
const pageThumbScrollHeight = computed(() => Math.max(0, ...map(pageThumbs.value, 'height')) * 1.5);

const limitTagLength = (tags: NHentaiTag[], maxLength: number) => {
  const result = tags.slice(0, maxLength);
  const larger = tags.length - result.length;
  if (larger > 0) {
    result.push({ type: '__limit__', name: '__limit__', count: larger });
  }
  return result;
};

const isLimitTag = (tag: NHentaiTag) => tag.type === '__limit__';

let thumbUrlTemplate: Awaited<ReturnType<typeof getCompliedThumbMediaUrlTemplate>>;
const getThumbInfo = ({ t, w, h }: NHentaiImage, i: number) => ({
  url: thumbUrlTemplate({
    mid: gallery.value?.media_id,
    filename: `${i + 1}t.${NHentaiImgExt[t]}`,
  }),
  height: w && h ? Math.floor(pageThumbWidth.value * Math.min(h / w, 1.8)) : 0,
});

const formatNumber = (num: number) => {
  if (num >= 1e6) return `${Math.floor(num / 1e6)}M`;
  if (num >= 1e3) return `${Math.floor(num / 1e3)}K`;
  return num;
};

const openTagUrl = (path?: string) => {
  if (!path) return;
  GM_openInTab(`${location.origin}${path}`, { active: true, setParent: true });
};

let loadingGid: string = '';

const open = async (el: HTMLElement, gid: string) => {
  if (virtualRef.value === el) return;
  const rect = el.getBoundingClientRect();
  const bodyWidth = document.body.clientWidth;
  const showRight = rect.left + rect.right <= bodyWidth;
  virtualRef.value = el;
  popoverPlacement.value = showRight ? 'right' : 'left';
  popoverTransition.value = false;
  popoverWidth.value = Math.min(
    POPOVER_MAX_WIDTH,
    Math.round(showRight ? bodyWidth - rect.right : rect.left) - 16,
  );
  visible.value = true;
  gallery.value = null;
  setTimeout(() => {
    if (!gallery.value) popoverTransition.value = true;
  });
  pageThumbs.value = [];
  try {
    loadingGid = gid;
    if (!thumbUrlTemplate) thumbUrlTemplate = await getCompliedThumbMediaUrlTemplate(gid);
    const loadedGallery = await getGallery(gid);
    if (loadingGid !== gid) return;
    gallery.value = loadedGallery;
    pageThumbs.value = loadedGallery.images.pages.slice(0, 12).map(getThumbInfo);
    await nextTick();
    popoverRef.value?.popperRef?.popperInstanceRef?.update();
  } catch (error) {
    logger.error(error);
  } finally {
    if (loadingGid === gid) loadingGid = '';
  }
};

const addPageThumbLine = () => {
  const curLength = pageThumbs.value.length;
  if (curLength >= gallery.value!.images.pages.length) return;
  const curLines = Math.ceil(curLength / pageThumbsColNum.value);
  pageThumbs.value.push(
    ...gallery
      .value!.images.pages.slice(curLength, (curLines + 1) * pageThumbsColNum.value)
      .map((img, i) => getThumbInfo(img, curLength + i)),
  );
};

const handleScrollWheel = (e: WheelEvent) => {
  const { scrollTop, clientHeight, scrollHeight } = e.currentTarget as HTMLElement;
  if (
    (scrollTop + clientHeight === scrollHeight && e.deltaY > 0) ||
    (scrollTop === 0 && e.deltaY < 0)
  ) {
    e.preventDefault();
  }
};

const close = () => {
  if (visible.value) visible.value = false;
};

const copyTitle = () => {
  GM_setClipboard(title.value, 'text', () => {
    showMessage({
      type: 'success',
      message: t('common.copied'),
      duration: 2000,
    });
  });
};

watch(visible, val => {
  if (val) {
    window.addEventListener('scroll', close);
    window.addEventListener('resize', close);
  } else {
    window.removeEventListener('scroll', close);
    window.removeEventListener('resize', close);
  }
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', close);
  window.removeEventListener('resize', close);
});

defineExpose({ open });
</script>

<style lang="less" scoped>
.bold {
  font-weight: bold;
}

.info-label {
  display: inline-block;
  .lang-zh & {
    min-width: 30px;
  }
  .lang-en & {
    min-width: 80px;
  }
}

.info-tag-wrapper {
  display: flex;
}

.info-tag {
  margin: 2px;
  user-select: none;
  &--pointer {
    cursor: pointer;
  }
}

.image-loading {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
}

.scroll-container {
  min-height: 400px;
  margin: 8px -8px 0 -8px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #0003;
    border-radius: 10px;
    transition: all 0.2s ease-in-out;
  }

  &::-webkit-scrollbar-track {
    border-radius: 10px;
  }

  &-inner {
    padding: 0 8px;
  }
}
</style>

<style lang="less">
.gallery-mini-popover {
  .el-descriptions {
    &__header {
      align-items: flex-start !important;
    }
    &__extra {
      height: 0;
      white-space: nowrap;
    }
    &__title {
      text-align: left !important;
    }
    &__cell {
      display: flex;
      padding-bottom: 0 !important;
    }
    &__label {
      flex-grow: 0;
      flex-shrink: 0;
    }
    &__content {
      flex-grow: 1;
      flex-shrink: 1;
    }
  }
  .el-link {
    color: var(--el-link-text-color) !important;
    &:hover {
      color: var(--el-link-hover-text-color) !important;
    }
  }
  .el-image {
    width: 100%;
  }
}

.popover-transition {
  transition: var(--el-transition-all);
  transition-duration: 0.2s;
}
</style>
