<template>
  <el-popover
    ref="popoverRef"
    v-model:visible="visible"
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
          <el-button class="popover-close-btn" :icon="CloseBold" circle text @click="close" />
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
            v-for="tag in tags"
            :key="tag.id ?? tag.name"
            class="info-tag info-tag--pointer"
            type="info"
            effect="dark"
            disable-transitions
            @click="() => openTagUrl(tag.url)"
          >
            <span class="bold">{{ tag.name }}</span> | {{ formatNumber(tag.count || 0) }}
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
        :infinite-scroll-distance="50"
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
      :style="{ height: '640px', maxHeight: '90vh' }"
      @wheel.prevent
    ></div>
  </el-popover>
</template>

<script setup lang="ts">
import { GM_openInTab } from '$';
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue';
import {
  ElPopover,
  ElDescriptions,
  ElDescriptionsItem,
  ElTag,
  ElLink,
  ElRow,
  ElCol,
  ElImage,
  ElButton,
  ElInfiniteScroll as vInfiniteScroll,
  vLoading,
} from 'element-plus';
import { CloseBold } from '@element-plus/icons-vue';
import { groupBy, map } from 'lodash-es';
import { useI18n } from 'vue-i18n';
import { NHentaiImgExt, getGallery, type NHentaiGallery, type NHentaiImage } from '@/utils/nhentai';
import { settings } from '@/utils/settings';
import logger from '@/utils/logger';

const POPOVER_MAX_WIDTH = 720;
const POPOVER_THUMB_MORE_COL_WIDTH = 640;

const TAG_TYPES = ['parody', 'tag', 'artist', 'language', 'category'] as const;
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

const galleryLink = computed(() => `https://nhentai.net/g/${gallery.value?.id}/`);

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

const getThumbInfo = ({ t, w, h }: NHentaiImage, i: number) => ({
  url: `https://t3.nhentai.net/galleries/${gallery.value?.media_id}/${i + 1}t.${NHentaiImgExt[t]}`,
  height: w && h ? Math.floor((pageThumbWidth.value * h) / w) : 0,
});

const formatNumber = (num: number) => {
  if (num >= 1e6) return `${Math.floor(num / 1e6)}M`;
  if (num >= 1e3) return `${Math.floor(num / 1e3)}K`;
  return num;
};

const openTagUrl = (path?: string) => {
  if (!path) return;
  GM_openInTab(`https://nhentai.net${path}`, { active: true, setParent: true });
};

let loadingGid: string = '';

const open = async (el: HTMLElement, gid: string) => {
  if (virtualRef.value === el) return;
  const rect = el.getBoundingClientRect();
  const bodyWidth = document.body.clientWidth;
  const showRight = rect.left + rect.right <= bodyWidth;
  popoverPlacement.value = showRight ? 'right' : 'left';
  virtualRef.value = el;
  popoverWidth.value = Math.min(
    POPOVER_MAX_WIDTH,
    Math.round(showRight ? bodyWidth - rect.right : rect.left) - 16,
  );
  visible.value = true;
  gallery.value = null;
  pageThumbs.value = [];
  try {
    loadingGid = gid;
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

.popover-close-btn {
  transform: translate(4px, -4px);
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
</style>
