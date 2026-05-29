<template>
  <el-form-item v-if="IS_NHENTAI" :label="t('setting.nHentaiDownloadHost')">
    <el-select v-model="settings.nHentaiDownloadHost" :disabled="!!settings.customDownloadUrl">
      <el-option
        v-for="value in nHentaiDownloadHostSpecials"
        :key="value"
        :label="t(`setting.nHentaiDownloadHostOption.${value}`)"
        :value="value"
      />
      <el-option v-for="host in nHentaiDownloadHosts" :key="host" :label="host" :value="host" />
    </el-select>
  </el-form-item>
</template>

<script setup lang="ts">
import { ElFormItem, ElOption, ElSelect } from 'element-plus';
import { useI18n } from 'petite-vue-i18n';
import { IS_NHENTAI } from '@/const';
import {
  nHentaiDownloadHosts,
  nHentaiDownloadHostSpecials,
  writeableSettings as settings,
} from '@/utils/settings';

const { t } = useI18n();
</script>
