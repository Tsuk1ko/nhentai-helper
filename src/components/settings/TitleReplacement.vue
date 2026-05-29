<template>
  <el-collapse>
    <el-collapse-item>
      <template #title>
        <span
          style="color: var(--el-text-color-regular); font-size: var(--el-form-label-font-size)"
          >{{ t('setting.titleReplacement') }}</span
        >
      </template>
      <el-table id="title-replacement-table" :data="settings.titleReplacement">
        <el-table-column label="From">
          <template #default="scope">
            <el-input v-model="scope.row.from">
              <template #prefix>
                <span v-if="scope.row.regexp" class="no-sl">/</span>
              </template>
              <template #suffix>
                <span v-if="scope.row.regexp" class="no-sl">/</span>
              </template>
            </el-input>
          </template>
        </el-table-column>
        <el-table-column label="To">
          <template #default="scope">
            <el-input v-model="scope.row.to" />
          </template>
        </el-table-column>
        <el-table-column label="RegExp" width="80">
          <template #default="scope">
            <el-switch v-model="scope.row.regexp" />
          </template>
        </el-table-column>
        <el-table-column width="70">
          <template #default="scope">
            <ConfirmPopup @confirm="() => delTitleReplacement(scope.$index)">
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
import { writeableSettings as settings } from '@/utils/settings';

const { t } = useI18n();

const addTitleReplacement = () => {
  settings.titleReplacement.push({ from: '', to: '', regexp: false });
};

const delTitleReplacement = (index: number) => {
  settings.titleReplacement.splice(index, 1);
};
</script>
