<template>
  <el-collapse>
    <el-collapse-item>
      <template #title>
        <span
          style="color: var(--el-text-color-regular); font-size: var(--el-form-label-font-size)"
          >{{ t('setting.titleBlacklist') }}</span
        >
      </template>
      <el-table :data="settings.titleBlacklist">
        <el-table-column label="Content">
          <template #default="scope">
            <el-input v-model="scope.row.content">
              <template #prefix>
                <span v-if="scope.row.regexp" class="no-sl">/</span>
              </template>
              <template #suffix>
                <span v-if="scope.row.regexp" class="no-sl">/</span>
              </template>
            </el-input>
          </template>
        </el-table-column>
        <el-table-column label="RegExp" width="80">
          <template #default="scope">
            <el-switch v-model="scope.row.regexp" />
          </template>
        </el-table-column>
        <el-table-column width="70">
          <template #default="scope">
            <ConfirmPopup @confirm="() => delTitleBlacklist(scope.$index)">
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
  ElInput,
  ElSwitch,
  ElTable,
  ElTableColumn,
} from 'element-plus';
import { useI18n } from 'petite-vue-i18n';
import ConfirmPopup from '@/components/ConfirmPopup.vue';
import { writeableSettings as settings } from '@/utils/settings';

const { t } = useI18n();

const addTitleBlacklist = () => {
  settings.titleBlacklist.push({ content: '', regexp: false });
};

const delTitleBlacklist = (index: number) => {
  settings.titleBlacklist.splice(index, 1);
};
</script>
