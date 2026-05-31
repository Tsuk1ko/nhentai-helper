<template>
  <el-form-item :label="t('setting.addMetaFile')">
    <el-checkbox-group v-model="settings.addMetaFile">
      <el-checkbox label="ComicInfo.xml" value="ComicInfoXml" />
      <el-checkbox label="info.json (eze)" value="EzeInfoJson" />
    </el-checkbox-group>
  </el-form-item>
  <el-form-item
    v-if="settings.addMetaFile.includes('ComicInfoXml')"
    :label="`└ ${t('setting.metaFileTitleLanguage')}`"
  >
    <el-select v-model="settings.metaFileTitleLanguage">
      <el-option :label="t('common.english')" value="english" />
      <el-option :label="t('common.japanese')" value="japanese" />
    </el-select>
  </el-form-item>
</template>

<script setup lang="ts">
import { ElCheckbox, ElCheckboxGroup, ElFormItem, ElOption, ElSelect } from 'element-plus';
import { useI18n } from 'petite-vue-i18n';
import { writeableSettings as settings } from '@/utils/settings';

const { t } = useI18n();
</script>
