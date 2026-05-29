<template>
  <el-divider>{{ t('setting.history.title') }}</el-divider>
  <p class="no-sl">
    {{
      t('setting.history.downloadedNumberTip', {
        num: Number.isNaN(downloadedNum) ? downloadedNum : numberFormatter.format(downloadedNum),
      })
    }}
  </p>
  <el-button
    type="primary"
    :icon="Download"
    :disabled="!downloadedNum"
    :loading="exporting"
    @click="exportHistory"
  >
    {{ t('setting.history.export') }}
  </el-button>
  <el-button type="primary" :icon="Upload" :loading="importing" @click="importHistory">
    {{ t('setting.history.import') }}
  </el-button>
  <ConfirmPopup @confirm="clearHistory">
    <el-button type="danger" :icon="Delete" :loading="clearing">
      {{ t('setting.history.clear') }}
    </el-button>
  </ConfirmPopup>
  <p class="no-sl">{{ t('setting.history.importTip') }}</p>
</template>

<script setup lang="ts">
import { Delete, Download, Upload } from '@element-plus/icons-vue';
import { ElButton, ElDivider } from 'element-plus';
import { useI18n } from 'petite-vue-i18n';
import { onMounted, ref } from 'vue';
import ConfirmPopup from '@/components/ConfirmPopup.vue';
import {
  clearDownloadHistory,
  exportDownloadHistory,
  getDownloadNumber,
  importDownloadHistory,
} from '@/utils/downloadHistory';
import { showMessage } from '@/utils/elementPlus';
import { pickAndReadFile } from '@/utils/file';
import { numberFormatter } from '@/utils/formatter';

const { t } = useI18n();

const downloadedNum = ref(NaN);
const exporting = ref(false);
const importing = ref(false);
const clearing = ref(false);

const refreshDownloadNum = async () => {
  downloadedNum.value = await getDownloadNumber();
};

const showMessageBySucceed = (succeed: boolean): void => {
  showMessage({
    type: succeed ? 'success' : 'error',
    message: succeed ? 'Succeed' : 'Failed, please check console for error message',
  });
};

const exportHistory = async () => {
  exporting.value = true;
  const succeed = await exportDownloadHistory();
  exporting.value = false;
  showMessageBySucceed(succeed);
};

const importHistory = async () => {
  const data = await pickAndReadFile('application/zip');
  if (!data) return;
  importing.value = true;
  const succeed = await importDownloadHistory(data);
  importing.value = false;
  refreshDownloadNum();
  showMessageBySucceed(succeed);
};

const clearHistory = async () => {
  clearing.value = true;
  const succeed = await clearDownloadHistory();
  clearing.value = false;
  refreshDownloadNum();
  showMessageBySucceed(succeed);
};

onMounted(() => {
  refreshDownloadNum();
});
</script>
