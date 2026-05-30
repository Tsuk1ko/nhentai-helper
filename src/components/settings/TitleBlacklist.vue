<template>
  <el-collapse>
    <el-collapse-item>
      <template #title>
        <span
          style="font-size: var(--el-form-label-font-size); color: var(--el-text-color-regular)"
        >
          {{ t('setting.titleBlacklist') }} ({{ settings.titleBlacklist.length }})
        </span>
      </template>
      <el-table :data="settings.titleBlacklist">
        <el-table-column label="Content">
          <template #default="{ row }">
            <RegExpInput v-model="row.content" :regexp="row.regexp" />
          </template>
        </el-table-column>
        <el-table-column label="RegExp" width="80">
          <template #default="{ row }">
            <el-switch v-model="row.regexp" />
          </template>
        </el-table-column>
        <el-table-column width="70">
          <template #default="{ $index }">
            <ConfirmPopup @confirm="() => delTitleBlacklist($index)">
              <el-button type="danger" :icon="Delete" />
            </ConfirmPopup>
          </template>
        </el-table-column>
        <template #append>
          <el-button text style="width: 100%" @click="addTitleBlacklist">+</el-button>
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
  ElSwitch,
  ElTable,
  ElTableColumn,
} from 'element-plus';
import { useI18n } from 'petite-vue-i18n';
import ConfirmPopup from '@/components/ConfirmPopup.vue';
import RegExpInput from '@/components/RegExpInput.vue';
import { writeableSettings as settings } from '@/utils/settings';

const { t } = useI18n();

const addTitleBlacklist = () => {
  settings.titleBlacklist.push({ content: '', regexp: false });
};

const delTitleBlacklist = (index: number) => {
  settings.titleBlacklist.splice(index, 1);
};
</script>
