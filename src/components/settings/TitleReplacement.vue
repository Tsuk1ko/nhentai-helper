<template>
  <el-collapse>
    <el-collapse-item>
      <template #title>
        <span
          style="color: var(--el-text-color-regular); font-size: var(--el-form-label-font-size)"
        >
          {{ t('setting.titleReplacement') }} ({{ settings.titleReplacement.length }})
        </span>
      </template>
      <el-table :data="settings.titleReplacement">
        <el-table-column :label="t('setting.titleReplacementTable.from')">
          <template #default="{ row }">
            <RegExpInput v-model="row.from" :regexp="row.regexp" />
          </template>
        </el-table-column>
        <el-table-column :label="t('setting.titleReplacementTable.to')">
          <template #default="{ row }">
            <el-input v-model="row.to" />
          </template>
        </el-table-column>
        <el-table-column :label="t('common.regexp')" width="110">
          <template #default="{ row }">
            <el-switch v-model="row.regexp" />
          </template>
        </el-table-column>
        <el-table-column :label="t('common.ignoreCase')" width="110">
          <template #default="{ row }">
            <el-switch v-model="row.ignoreCase" />
          </template>
        </el-table-column>
        <el-table-column width="70">
          <template #default="{ $index }">
            <ConfirmPopup @confirm="() => delTitleReplacement($index)">
              <el-button type="danger" :icon="Delete" />
            </ConfirmPopup>
          </template>
        </el-table-column>
        <template #append>
          <el-button text style="width: 100%" @click="addTitleReplacement">+</el-button>
        </template>
      </el-table>
    </el-collapse-item>
  </el-collapse>
</template>

<script setup lang="ts">
import { Delete } from '@element-plus/icons-vue';
import {
  ElButton,
  ElCollapse,
  ElCollapseItem,
  ElInput,
  ElSwitch,
  ElTable,
  ElTableColumn,
} from 'element-plus';
import { useI18n } from 'petite-vue-i18n';
import ConfirmPopup from '@/components/ConfirmPopup.vue';
import RegExpInput from '@/components/RegExpInput.vue';
import { writeableSettings as settings } from '@/utils/settings';

const { t } = useI18n();

const addTitleReplacement = () => {
  settings.titleReplacement.push({ from: '', to: '', regexp: false, ignoreCase: false });
};

const delTitleReplacement = (index: number) => {
  settings.titleReplacement.splice(index, 1);
};
</script>
