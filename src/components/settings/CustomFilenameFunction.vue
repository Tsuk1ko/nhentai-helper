<template>
  <el-form-item :label="t('setting.customFilenameFunction')">
    <span class="monospace"
      >function (filename<el-text type="info">: string</el-text>, gallery<el-text type="info"
        >:
        <el-link
          type="primary"
          href="https://github.com/Tsuk1ko/nhentai-helper/blob/df00acb0d5ad8244d408561410b3c647d5af7ed4/src/utils/nhentai.ts#L57-L75"
          target="_blank"
          >NHentaiGallery</el-link
        ></el-text
      >) {</span
    >
    <el-input
      v-model="settings.customFilenameFunction"
      class="monospace"
      type="textarea"
      placeholder="return filename;"
      :autosize="{ minRows: 1 }"
    />
    <span class="monospace">}</span>
  </el-form-item>
</template>

<script setup lang="ts">
import { ElFormItem, ElInput, ElLink, ElText } from 'element-plus';
import { useI18n } from 'petite-vue-i18n';
import { writeableSettings as settings } from '@/utils/settings';

const { t } = useI18n();
</script>

<style lang="less" scoped>
.monospace {
  font-family: monospace;

  span& {
    user-select: none;
  }
}
</style>
