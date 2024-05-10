<template>
  <el-popover
    ref="popoverRef"
    v-model:visible="visible"
    :virtual-ref="virtualRef"
    virtual-triggering
    :placement="popoverPlacement"
    trigger="click"
    :width="popoverWidth"
  >
    <div v-if="gallery" class="gallery-mini-popover">
      <el-descriptions :title="title" :column="1">
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
            @click="() => openTagUrl(tag.url)"
          >
            <span class="bold">{{ tag.name }}</span> | {{ formatNumber(tag.count || 0) }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item v-if="gallery.num_pages">
          <template #label>
            <span class="info-label bold">{{ t('meta.page') }}</span>
          </template>
          <el-tag class="info-tag" type="info" effect="dark">
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
      <el-scrollbar
        v-if="pageThumbs.length"
        :height="`${pageThumbScrollHeight}px`"
        :style="{ margin: '8px -8px 0 -8px' }"
      >
        <div :style="{ padding: '0 8px' }">
          <el-row :gutter="8">
            <el-col v-for="{ url, height } in pageThumbs" :key="url" :span="pageThumbsColSpan">
              <el-image :src="url" lazy :style="{ 'min-height': `${height}px` }" />
            </el-col>
          </el-row>
        </div>
      </el-scrollbar>
    </div>
  </el-popover>
</template>

<script setup lang="ts">
import { GM_openInTab } from '$';
import { computed, ref } from 'vue';
import {
  ElPopover,
  ElDescriptions,
  ElDescriptionsItem,
  ElTag,
  ElLink,
  ElRow,
  ElCol,
  ElImage,
  ElScrollbar,
} from 'element-plus';
import { groupBy, map } from 'lodash-es';
import { useI18n } from 'vue-i18n';
import { NHentaiImgExt, type NHentaiGallery, type NHentaiImage } from '@/utils/nhentai';
// import { settings } from '@/utils/settings';

const TAG_TYPES = ['tag', 'artist', 'language', 'category'] as const;
const getTagSortIndex = (type: string) => {
  const index = TAG_TYPES.findIndex(t => t === type);
  return index === -1 ? 999 : index;
};

const { t } = useI18n();

const visible = ref(false);
const virtualRef = ref<HTMLElement>();
const popoverRef = ref<HTMLElement>();
const popoverPlacement = ref<InstanceType<typeof ElPopover>['placement']>('right');
const popoverWidth = ref(0);

const gallery = ref<NHentaiGallery | null>({
  id: 509067,
  media_id: '2914229',
  title: {
    english: '[Nanahara Mitsuru] Ojisan ga mu shimmusume ni etchinakoto o oshieru hanashi joukan',
    japanese:
      '[\u4e03\u539f\u307f\u3064\u308b] \u30aa\u30b8\u30b5\u30f3\u304c\u7121\u77e5\u3063\u5a18\u306b\u30a8\u30c3\u30c1\u306a\u3053\u3068\u3092\u6559\u3048\u308b\u8a71\u30fb\u4e0a\u5dfb',
    pretty: 'Ojisan ga mu shimmusume ni etchinakoto o oshieru hanashi joukan',
  },
  images: {
    pages: [
      { t: 'j', w: 1280, h: 1810 },
      { t: 'j', w: 1280, h: 1810 },
      { t: 'j', w: 1280, h: 1810 },
      { t: 'j', w: 1280, h: 1810 },
      { t: 'j', w: 1280, h: 1810 },
      { t: 'j', w: 1280, h: 1810 },
      { t: 'j', w: 1280, h: 1810 },
      { t: 'j', w: 1280, h: 1810 },
      { t: 'j', w: 1280, h: 1810 },
      { t: 'j', w: 1280, h: 1810 },
      { t: 'j', w: 1280, h: 1810 },
      { t: 'j', w: 1280, h: 1810 },
      { t: 'j', w: 1280, h: 1810 },
      { t: 'j', w: 1280, h: 1810 },
      { t: 'j', w: 1280, h: 1810 },
      { t: 'j', w: 1280, h: 1810 },
      { t: 'j', w: 1280, h: 1810 },
      { t: 'j', w: 1280, h: 1810 },
      { t: 'j', w: 1280, h: 1810 },
      { t: 'j', w: 1280, h: 1810 },
      { t: 'j', w: 1280, h: 1810 },
      { t: 'j', w: 1280, h: 1810 },
      { t: 'j', w: 1280, h: 1810 },
      { t: 'j', w: 1280, h: 1810 },
      { t: 'j', w: 1280, h: 1810 },
      { t: 'j', w: 1280, h: 1810 },
      { t: 'j', w: 1280, h: 1810 },
      { t: 'j', w: 1280, h: 1810 },
      { t: 'j', w: 1280, h: 1810 },
      { t: 'j', w: 1280, h: 1810 },
      { t: 'j', w: 1280, h: 1810 },
      { t: 'j', w: 1280, h: 1810 },
      { t: 'j', w: 1280, h: 1810 },
      { t: 'j', w: 1280, h: 1810 },
      { t: 'j', w: 1280, h: 1810 },
      { t: 'j', w: 1280, h: 1810 },
      { t: 'j', w: 1280, h: 1810 },
      { t: 'j', w: 1280, h: 1810 },
      { t: 'j', w: 1280, h: 1810 },
      { t: 'j', w: 1280, h: 1810 },
      { t: 'j', w: 1280, h: 1810 },
      { t: 'j', w: 1280, h: 1810 },
      { t: 'j', w: 1280, h: 1810 },
    ],
    cover: { t: 'j', w: 350, h: 495 },
    thumbnail: { t: 'j', w: 250, h: 354 },
  },
  scanlator: '',
  upload_date: 1715319570,
  tags: [
    { id: 6346, type: 'language', name: 'japanese', url: '/language/japanese/', count: 266223 },
    {
      id: 10314,
      type: 'tag',
      name: 'schoolgirl uniform',
      url: '/tag/schoolgirl-uniform/',
      count: 73162,
    },
    { id: 13720, type: 'tag', name: 'nakadashi', url: '/tag/nakadashi/', count: 76751 },
    { id: 19018, type: 'tag', name: 'dark skin', url: '/tag/dark-skin/', count: 35131 },
    { id: 19440, type: 'tag', name: 'lolicon', url: '/tag/lolicon/', count: 92605 },
    { id: 20525, type: 'tag', name: 'defloration', url: '/tag/defloration/', count: 30907 },
    { id: 25663, type: 'tag', name: 'oppai loli', url: '/tag/oppai-loli/', count: 3249 },
    { id: 29013, type: 'tag', name: 'dilf', url: '/tag/dilf/', count: 23714 },
    { id: 31880, type: 'tag', name: 'bbm', url: '/tag/bbm/', count: 18899 },
    { id: 33172, type: 'category', name: 'doujinshi', url: '/category/doujinshi/', count: 364351 },
    {
      id: 141668,
      type: 'artist',
      name: 'nanahara mitsuru',
      url: '/artist/nanahara-mitsuru/',
      count: 12,
    },
  ],
  num_pages: 43,
  num_favorites: 0,
});

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

const pageThumbs = computed(() => gallery.value?.images.pages.slice(0, 12).map(getThumbInfo) ?? []);
const pageThumbsColSpan = computed(() => (popoverWidth.value >= 600 ? 6 : 8));
const pageThumbWidth = computed(() => {
  const colNum = popoverWidth.value >= 600 ? 4 : 3;
  return (popoverWidth.value - 24 - (colNum - 1) * 8) / colNum;
});
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

const open = (el: HTMLElement) => {
  if (virtualRef.value === el) return;
  const rect = el.getBoundingClientRect();
  const bodyWidth = document.body.clientWidth;
  const showRight = rect.left + rect.right <= bodyWidth;
  popoverPlacement.value = showRight ? 'right' : 'left';
  virtualRef.value = el;
  popoverWidth.value = Math.min(
    600,
    Math.round(showRight ? bodyWidth - rect.right : rect.left) - 16,
  );
  visible.value = true;
};

defineExpose({ open });
</script>

<style lang="less" scoped>
.bold {
  font-weight: bold;
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
</style>

<style lang="less">
.gallery-mini-popover {
  .el-descriptions__title {
    text-align: left !important;
  }
  .el-descriptions__cell {
    padding-bottom: 0 !important;
  }
  .el-link {
    color: var(--el-link-text-color) !important;
    &.el-link:hover {
      color: var(--el-link-hover-text-color) !important;
    }
  }
}
</style>
