<template>
  <el-form-item :label="t('setting.downloadedTitleColor')">
    <el-color-picker
      v-model="settings.downloadedTitleColor"
      show-alpha
      clearable
      color-format="rgb"
      @active-change="handlePreviewChange"
      @change="handlePreviewChange"
    />
    <div
      class="downloaded-title-color-preview"
      :class="CAPTION_CLASS"
      :style="{ color: downloadedTitleColorPreview }"
    >
      {{ downloadedTitleColorPreview || settings.downloadedTitleColor }}
    </div>
  </el-form-item>
</template>

<script setup lang="ts">
import { ElColorPicker, ElFormItem } from 'element-plus';
import { useI18n } from 'petite-vue-i18n';
import { ref } from 'vue';
import { selector } from '@/rules/selector';
import { writeableSettings as settings } from '@/utils/settings';

const { t } = useI18n();

const CAPTION_CLASS = selector.galleryCaption.replace('.', '');
const downloadedTitleColorPreview = ref(settings.downloadedTitleColor);

const handlePreviewChange = (val: string | null) => {
  downloadedTitleColorPreview.value = val || settings.downloadedTitleColor;
};
</script>

<style lang="less" scoped>
.downloaded-title-color-preview {
  position: relative !important;
  width: unset !important;
  height: unset !important;
  inset: unset !important;
  border-radius: 0 !important;
  margin-left: 8px !important;
  padding: 4px 16px !important;
  user-select: none !important;
}
</style>
