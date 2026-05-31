<template>
  <el-form-item :label="t('setting.addMetaFile')">
    <el-checkbox-group v-model="settings.addMetaFile">
      <el-checkbox label="ComicInfo.xml" value="ComicInfoXml" />
      <el-checkbox label="info.json (eze)" value="EzeInfoJson" />
    </el-checkbox-group>
  </el-form-item>
  <template v-if="settings.addMetaFile.includes('ComicInfoXml')">
    <el-form-item :label="`├ ${t('setting.metaFileTitleLanguage')}`">
      <el-select v-model="settings.metaFileTitleLanguage">
        <el-option :label="t('common.english')" value="english" />
        <el-option :label="t('common.japanese')" value="japanese" />
      </el-select>
    </el-form-item>
    <el-form-item :label="`├ ${t('setting.comicInfoTagsExtraInclude')}`">
      <el-select
        v-model="settings.comicInfoTagsExtraInclude"
        popper-class="comic-info-tags-extra-include-popper"
        multiple
        filterable
        allow-create
      >
        <el-option
          v-for="type in comicInfoTagsExtraIncludeOptions"
          :key="type"
          :label="`${t(`meta.${type}`)} (${type})`"
          :value="type"
        />
        <template #label="{ value }">{{
          comicInfoTagsExtraIncludeOptionsSet.has(value) ? t(`meta.${value}`) : value
        }}</template>
        <template #footer>
          <el-button text style="width: 100%" @click="resetComicInfoTagsExtraIncludeToDefault">{{
            t('common.resetToDefault')
          }}</el-button>
        </template>
      </el-select>
    </el-form-item>
    <el-form-item :label="`└ ${t('setting.comicInfoTagsExtraWithType')}`">
      <el-switch v-model="settings.comicInfoTagsExtraWithType" />
    </el-form-item>
  </template>
</template>

<script setup lang="ts">
import {
  ElButton,
  ElCheckbox,
  ElCheckboxGroup,
  ElFormItem,
  ElOption,
  ElSelect,
  ElSwitch,
} from 'element-plus';
import { useI18n } from 'petite-vue-i18n';
import { settingDefinitions, writeableSettings as settings } from '@/utils/settings';

const { t } = useI18n();

const comicInfoTagsExtraIncludeOptions = [
  'parody',
  'character',
  'artist',
  'group',
  'language',
  'category',
];

const comicInfoTagsExtraIncludeOptionsSet = new Set(comicInfoTagsExtraIncludeOptions);

const resetComicInfoTagsExtraIncludeToDefault = () => {
  settings.comicInfoTagsExtraInclude = settingDefinitions.comicInfoTagsExtraInclude.default();
};
</script>

<style lang="less">
.comic-info-tags-extra-include-popper {
  .el-select-dropdown__footer {
    padding: 0;
  }
}
</style>
