<template>
  <el-form-item :label="t('setting.compressionFilename')">
    <el-input
      v-model="settings.compressionFilename"
      :placeholder="settingDefinitions.compressionFilename.default"
      @blur="
        if (!settings.compressionFilename) {
          settings.compressionFilename = settingDefinitions.compressionFilename.default;
        }
      "
    />
  </el-form-item>
  <el-form-item v-if="hasArtist" label="└ {{artist}}">
    <!-- 文件名最大作者数量 -->
    <div class="inline-item">
      <span class="inline-item__name">{{ t('setting.maxNumber') }}</span>
      <el-input-number
        v-model="settings.filenameMaxArtistsNumber"
        size="small"
        :min="0"
        :value-on-clear="settingDefinitions.filenameMaxArtistsNumber.default"
        :step-strictly="true"
        :style="{ width: '90px' }"
      />
    </div>
    <!-- 文件名作者分隔符 -->
    <div class="inline-item">
      <span class="inline-item__name">{{ t('setting.separator') }}</span>
      <el-input
        v-model="settings.filenameArtistsSeparator"
        size="small"
        :placeholder="settingDefinitions.filenameArtistsSeparator.default"
        :style="{ width: '50px' }"
      />
    </div>
  </el-form-item>
</template>

<script setup lang="ts">
import { ElFormItem, ElInput, ElInputNumber } from 'element-plus';
import { useI18n } from 'petite-vue-i18n';
import { computed } from 'vue';
import { settingDefinitions, writeableSettings as settings } from '@/utils/settings';

const { t } = useI18n();

const artistReg = /\{\{\s*artist\s*\}\}/;

const hasArtist = computed(() => artistReg.test(settings.compressionFilename));
</script>

<style lang="less" scoped>
.inline-item {
  display: inline-block;
  &:not(:last-of-type) {
    margin-right: 8px;
  }
  &__name {
    margin-right: 4px;
    user-select: none;
  }
}
</style>
