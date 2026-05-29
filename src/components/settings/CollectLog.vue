<template>
  <el-form-item :label="t('setting.collectLog')">
    <div>
      <div class="gap-inputs">
        <el-switch v-model="settings.collectLog" />
        <template v-if="settings.collectLog">
          <el-button type="primary" :icon="DocumentCopy" @click="copyLogs">
            {{ t('setting.copyLogs') }}
          </el-button>
          <el-button type="danger" :icon="Delete" @click="clearLogs">
            {{ t('setting.clearLogs') }}
          </el-button>
        </template>
      </div>
      <div class="no-sl collect-log-tip">
        {{ t('setting.collectLogTip') }}
      </div>
    </div>
  </el-form-item>
</template>

<script setup lang="ts">
import { Delete, DocumentCopy } from '@element-plus/icons-vue';
import { GM_setClipboard } from '$';
import { ElButton, ElFormItem, ElSwitch } from 'element-plus';
import { useI18n } from 'petite-vue-i18n';
import { showMessage } from '@/utils/elementPlus';
import { clearLogs, exportLogs } from '@/utils/logger';
import { writeableSettings as settings } from '@/utils/settings';

const { t } = useI18n();

const copyLogs = () => {
  GM_setClipboard(`\`\`\`\n${exportLogs()}\n\`\`\``, 'text', () => {
    showMessage({
      type: 'success',
      message: t('common.copied'),
    });
  });
};
</script>

<style lang="less" scoped>
.gap-inputs {
  display: flex;
  gap: 4px 12px;

  :deep(.el-button) {
    margin: 0;
  }
}

.collect-log-tip {
  line-height: 1.5;
  margin-top: 12px;
}
</style>
