<template>
  <el-form-item :label="t('setting.convertWebpTo')">
    <el-radio-group v-model="settings.convertWebpTo">
      <el-radio value="">{{ t('common.disabled') }}</el-radio>
      <el-radio :value="MIME.JPG">jpg</el-radio>
      <el-radio :value="MIME.PNG">png</el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item
    v-if="settings.convertWebpTo === MIME.JPG"
    :label="`└ ${t('setting.convertWebpQuality')} (0~100)`"
  >
    <el-input-number
      v-model="settings.convertWebpQuality"
      size="small"
      :min="0"
      :max="100"
      :value-on-clear="settingDefinitions.convertWebpQuality.default"
      :step-strictly="true"
    />
  </el-form-item>
</template>

<script setup lang="ts">
import { ElFormItem, ElInputNumber, ElRadio, ElRadioGroup } from 'element-plus';
import { useI18n } from 'petite-vue-i18n';
import { MIME } from '@/typings';
import { settingDefinitions, writeableSettings as settings } from '@/utils/settings';

const { t } = useI18n();
</script>
