<template>
  <el-dialog v-model="show" :center="true" top="50px">
    <template #header="{ titleId, titleClass }">
      <div class="nhentai-helper-setting-help-buttons no-sl">
        <el-button size="small" @click="openHelp">Help</el-button>
        <el-button size="small" @click="openHelpCn">说明</el-button>
      </div>
      <span :id="titleId" :class="[titleClass, 'no-sl']">Settings</span>
    </template>
    <div id="nhentai-helper-setting-dialog">
      <div class="asterisk-left no-sl" style="margin-bottom: 18px">
        means refresh is required to take effect
      </div>
      <el-form label-width="auto" label-position="left">
        <!-- 下载线程数 -->
        <el-form-item class="m-b-32" label="Download thread">
          <el-slider v-model="settings.threadNum" :min="1" :max="32" :marks="threadNumMarks" />
        </el-form-item>
        <!-- 在新窗口打开本子 -->
        <el-form-item class="refresh-required" label="Open on new tab">
          <el-switch v-model="settings.openOnNewTab" />
        </el-form-item>
        <!-- 自定义压缩文件名 -->
        <el-form-item label="Compression filename">
          <el-input
            v-model="settings.compressionFileName"
            :placeholder="settingDefinitions.compressionFileName.default"
            @blur="
              if (!settings.compressionFileName) {
                settings.compressionFileName = settingDefinitions.compressionFileName.default;
              }
            "
          />
        </el-form-item>
        <!-- 自定义压缩级别 -->
        <el-form-item class="m-b-32" label="Compression level">
          <el-slider
            v-model="settings.compressionLevel"
            :min="0"
            :max="9"
            :marks="compressionLevelMarks"
          />
        </el-form-item>
        <!-- 文件名补零 -->
        <el-form-item label="Filename length">
          <el-input-number
            v-model="filenameLengthNumber"
            :min="0"
            :value-on-clear="settingDefinitions.filenameLength.default"
            :step-strictly="true"
            :disabled="settings.filenameLength === 'auto'"
          />
          <el-checkbox v-model="filenameLengthAuto" class="m-l-16" label="Auto" />
        </el-form-item>
        <!-- 自动取消下载过的本子 -->
        <el-form-item label="Auto cancel downloaded manga">
          <el-switch v-model="settings.autoCancelDownloadedManga" />
        </el-form-item>
        <!-- 自动重试 -->
        <el-form-item label="Auto retry when error occurs">
          <el-switch v-model="settings.autoRetryWhenErrorOccurs" />
        </el-form-item>
        <!-- 自动显示全部 -->
        <el-form-item label="Auto show all">
          <el-switch v-model="settings.autoShowAll" />
        </el-form-item>
        <!-- 显示忽略按钮 -->
        <el-form-item class="refresh-required" label="Show ignore button">
          <el-switch v-model="settings.showIgnoreButton" />
        </el-form-item>
        <el-divider>Advance Settings</el-divider>
        <!-- 自定义下载地址 -->
        <el-form-item label="Custom download URL">
          <el-input v-model="settings.customDownloadUrl" />
        </el-form-item>
        <!-- streamFiles 压缩选项 -->
        <el-form-item label='Compression "streamFiles"'>
          <el-switch v-model="settings.compressionStreamFiles" />
        </el-form-item>
        <!-- 串行模式 -->
        <el-form-item label="Series mode">
          <el-switch v-model="settings.seriesMode" />
        </el-form-item>
        <!-- 流式下载 -->
        <el-form-item label="Stream download">
          <el-switch v-model="settings.streamDownload" :disabled="DISABLE_STREAM_DOWNLOAD" />
        </el-form-item>
        <!-- 阻止控制台清空 -->
        <el-form-item v-if="IS_NHENTAI" class="refresh-required" label="Prevent console clearing">
          <el-switch v-model="settings.preventConsoleClearing" />
        </el-form-item>
      </el-form>
      <el-divider>Download History</el-divider>
      <p class="no-sl">
        You have downloaded {{ downloadNum }} manga on this site using nHentai Helper.
      </p>
      <el-button
        type="primary"
        :icon="Download"
        :disabled="!downloadNum"
        :loading="exporting"
        @click="exportHistory"
        >Export</el-button
      >
      <el-button type="primary" :icon="Upload" :loading="importing" @click="importHistory"
        >Import</el-button
      >
      <el-popconfirm title="Are you sure?" placement="top" @confirm="clearHistory">
        <template #reference>
          <el-button type="danger" :icon="Delete" :loading="clearing">Clear</el-button>
        </template>
      </el-popconfirm>
      <p class="no-sl">Notice: Import will not clear the existing history, but merges with it.</p>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { monkeyWindow } from '$';
import { computed, ref } from 'vue';
import { Delete, Download, Upload } from '@element-plus/icons-vue';
import {
  DISABLE_STREAM_DOWNLOAD,
  settingDefinitions,
  writeableSettings as settings,
  startWatchSettings,
} from '@/utils/settings';
import { ElMarks } from '@/typings';
import {
  clearDownloadHistory,
  exportDownloadHistory,
  getDownloadNumber,
  importDownloadHistory,
} from '@/utils/downloadHistory';
import { pickAndReadFile } from '@/utils/file';
import { showMessage } from '@/utils/elMessage';
import { IS_NHENTAI } from '@/const';

startWatchSettings();

const threadNumMarks: ElMarks = {
  1: '1',
  4: '4',
  8: '8',
  16: '16',
  32: {
    label: '32',
    style: { whiteSpace: 'nowrap' },
  },
};
const compressionLevelMarks: ElMarks = {
  0: '0',
  1: '1',
  9: '9',
};

const show = ref(false);
const downloadNum = ref(NaN);

const filenameLengthNumber = computed<number>({
  get: () => (typeof settings.filenameLength === 'number' ? settings.filenameLength : 0),
  set: val => {
    settings.filenameLength = val;
  },
});
const filenameLengthAuto = computed<boolean>({
  get: () => settings.filenameLength === 'auto',
  set: val => {
    settings.filenameLength = val ? 'auto' : 0;
  },
});

const refreshDownloadNum = async () => {
  downloadNum.value = await getDownloadNumber();
};

const open = () => {
  show.value = true;
  refreshDownloadNum();
};

const openHelp = () => {
  monkeyWindow.open(
    'https://github.com/Tsuk1ko/nhentai-helper/blob/master/README.md#settings',
    '_blank',
  );
};

const openHelpCn = () => {
  monkeyWindow.open(
    'https://github.com/Tsuk1ko/nhentai-helper/blob/master/README-ZH.md#%E8%AE%BE%E7%BD%AE',
    '_blank',
  );
};

const exporting = ref(false);
const importing = ref(false);
const clearing = ref(false);

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

defineExpose({ open });
</script>

<style lang="less">
.nhentai-helper-setting-help-buttons {
  float: left;
  position: absolute;
}

#nhentai-helper-setting-dialog {
  .asterisk-left::before {
    content: '*';
    color: var(--el-color-danger);
    margin-right: 4px;
  }
  label {
    font-weight: unset;
  }
  input:not([type='file']):not([type='checkbox']) {
    background: inherit;
    color: var(--el-input-text-color, var(--el-text-color-regular));
  }
  .el-input.is-disabled .el-input__inner {
    color: var(--el-disabled-text-color);
  }
  .el-slider__stop {
    border: solid 1px var(--el-slider-runway-bg-color);
  }
  .el-form-item {
    &:last-of-type {
      margin-bottom: 0;
    }
    &.refresh-required > .el-form-item__label-wrap > .el-form-item__label::after {
      content: '*';
      color: var(--el-color-danger);
      margin-left: 4px;
    }
  }
  .el-divider__text {
    color: var(--el-text-color-secondary);
    user-select: none;
  }
  .m-l-16 {
    margin-left: 16px;
  }
  .m-b-32 {
    margin-bottom: 32px;
  }
  .no-sl,
  .el-form-item__label {
    user-select: none;
  }
}
</style>
