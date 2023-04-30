<template>
  <el-dialog v-model="show" :center="true" top="50px">
    <template #header="{ titleId, titleClass }">
      <div class="nhentai-helper-setting-help-buttons no-sl">
        <el-button size="small" @click="openHelp">{{ t('setting.helpButton') }}</el-button>
      </div>
      <span :id="titleId" :class="[titleClass, 'no-sl']">{{ t('setting.title') }}</span>
    </template>
    <div id="nhentai-helper-setting-dialog">
      <div class="asterisk-example no-sl" style="margin-bottom: 18px">
        {{ t('setting.asteriskTip') }}
      </div>
      <el-form label-width="auto" label-position="left">
        <!-- 语言 -->
        <el-form-item label="Language">
          <el-select v-model="settings.language">
            <el-option label="English" value="en" />
            <el-option label="中文" value="zh" />
          </el-select>
        </el-form-item>
        <!-- 下载线程数 -->
        <el-form-item class="m-b-32" :label="t('setting.downloadThread')">
          <el-slider v-model="settings.threadNum" :min="1" :max="32" :marks="threadNumMarks" />
        </el-form-item>
        <!-- 在新窗口打开本子 -->
        <el-form-item class="refresh-required" :label="t('setting.openOnNewTab')">
          <el-switch v-model="settings.openOnNewTab" />
        </el-form-item>
        <!-- 自定义压缩文件名 -->
        <el-form-item :label="t('setting.compressionFilename')">
          <el-input
            v-model="settings.compressionFilename"
            :placeholder="settingDefinitions.compressionFilename.default"
            @blur="
              if (!settings.compressionFilename) {
                settings.compressionFilename = settingDefinitions.compressionFilename.default;
              }
            "
          />
        </el-form-item>
        <el-form-item label="└ {{artist}}">
          <!-- 文件名最大作者数量 -->
          <div class="inline-item">
            <span class="inline-item__name">{{ t('setting.maxNumber') }}</span>
            <el-input-number
              v-model="settings.filenameMaxArtistsNumber"
              size="small"
              :min="0"
              :value-on-clear="settingDefinitions.filenameMaxArtistsNumber.default"
              :step-strictly="true"
              :style="{ width: '90px' }"
            />
          </div>
          <!-- 文件名作者分隔符 -->
          <div class="inline-item">
            <span class="inline-item__name">{{ t('setting.separator') }}</span>
            <el-input
              v-model="settings.filenameArtistsSeparator"
              size="small"
              :placeholder="settingDefinitions.filenameArtistsSeparator.default"
              :style="{ width: '50px' }"
            />
          </div>
        </el-form-item>
        <!-- 自定义压缩级别 -->
        <el-form-item class="m-b-32" :label="t('setting.compressionLevel')">
          <el-slider
            v-model="settings.compressionLevel"
            :min="0"
            :max="9"
            :marks="compressionLevelMarks"
          />
        </el-form-item>
        <!-- 文件名补零 -->
        <el-form-item :label="t('setting.filenameLength')">
          <el-input-number
            v-model="filenameLengthNumber"
            :min="0"
            :value-on-clear="settingDefinitions.filenameLength.default"
            :step-strictly="true"
            :disabled="settings.filenameLength === 'auto'"
          />
          <el-checkbox v-model="filenameLengthAuto" class="m-l-16" :label="t('common.auto')" />
        </el-form-item>
        <!-- 自动取消下载过的本子 -->
        <el-form-item :label="t('setting.autoCancelDownloadedManga')">
          <el-switch v-model="settings.autoCancelDownloadedManga" />
        </el-form-item>
        <!-- 自动重试 -->
        <el-form-item :label="t('setting.autoRetryWhenErrorOccurs')">
          <el-switch v-model="settings.autoRetryWhenErrorOccurs" />
        </el-form-item>
        <!-- 自动显示全部 -->
        <el-form-item :label="t('setting.autoShowAll')">
          <el-switch v-model="settings.autoShowAll" />
        </el-form-item>
        <!-- 显示忽略按钮 -->
        <el-form-item class="refresh-required" :label="t('setting.showIgnoreButton')">
          <el-switch v-model="settings.showIgnoreButton" />
        </el-form-item>
        <!-- 已下载判断 key -->
        <el-form-item :label="t('setting.judgeDownloadedMangaByTitle')">
          <el-checkbox v-model="settings.judgeDownloadedByEnglish" :label="t('common.english')" />
          <el-checkbox v-model="settings.judgeDownloadedByJapanese" :label="t('common.japanese')" />
          <el-checkbox v-model="settings.judgeDownloadedByPretty" :label="t('common.pretty')" />
        </el-form-item>
        <!-- 进阶设置 -->
        <el-divider>{{ t('setting.advanceTitle') }}</el-divider>
        <!-- nHentai 下载地址 -->
        <el-form-item v-if="IS_NHENTAI" :label="t('setting.nHentaiDownloadHost')">
          <el-select
            v-model="settings.nHentaiDownloadHost"
            :disabled="!!settings.customDownloadUrl"
          >
            <el-option
              v-for="host in nHentaiDownloadHosts"
              :key="host"
              :label="host"
              :value="host"
            />
            <el-option :label="t('common.random')" value="random" />
            <el-option :label="t('common.balance')" value="balance" />
          </el-select>
        </el-form-item>
        <!-- 自定义下载地址 -->
        <el-form-item :label="t('setting.customDownloadUrl')">
          <el-input v-model="settings.customDownloadUrl" />
        </el-form-item>
        <!-- streamFiles 压缩选项 -->
        <el-form-item :label="t('setting.compressionStreamFiles')">
          <el-switch v-model="settings.compressionStreamFiles" />
        </el-form-item>
        <!-- 串行模式 -->
        <el-form-item :label="t('setting.seriesMode')">
          <el-switch v-model="settings.seriesMode" />
        </el-form-item>
        <!-- 流式下载 -->
        <el-form-item :label="t('setting.streamDownload')">
          <el-switch v-model="settings.streamDownload" :disabled="DISABLE_STREAM_DOWNLOAD" />
        </el-form-item>
        <!-- 阻止控制台清空 -->
        <el-form-item
          v-if="IS_NHENTAI"
          class="refresh-required"
          :label="t('setting.preventConsoleClearing')"
        >
          <el-switch v-model="settings.preventConsoleClearing" />
        </el-form-item>
      </el-form>
      <el-divider>{{ t('setting.history.title') }}</el-divider>
      <p class="no-sl">
        {{
          t('setting.history.downloadedNumberTip', {
            num: Number.isNaN(downloadedNum) ? downloadedNum : n(downloadedNum),
          })
        }}
      </p>
      <el-button
        type="primary"
        :icon="Download"
        :disabled="!downloadedNum"
        :loading="exporting"
        @click="exportHistory"
        >{{ t('setting.history.export') }}</el-button
      >
      <el-button type="primary" :icon="Upload" :loading="importing" @click="importHistory">{{
        t('setting.history.import')
      }}</el-button>
      <el-popconfirm
        :title="t('setting.history.clearConfirm')"
        :confirm-button-text="t('setting.history.clearConfirmYes')"
        :cancel-button-text="t('setting.history.clearConfirmNo')"
        placement="top"
        @confirm="clearHistory"
      >
        <template #reference>
          <el-button type="danger" :icon="Delete" :loading="clearing">{{
            t('setting.history.clear')
          }}</el-button>
        </template>
      </el-popconfirm>
      <p class="no-sl">{{ t('setting.history.importTip') }}</p>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { monkeyWindow } from '$';
import { computed, ref, watch } from 'vue';
import { Delete, Download, Upload } from '@element-plus/icons-vue';
import { useI18n } from 'vue-i18n';
import {
  DISABLE_STREAM_DOWNLOAD,
  nHentaiDownloadHosts,
  settingDefinitions,
  writeableSettings as settings,
  startWatchSettings,
} from '@/utils/settings';
import type { ElMarks } from '@/typings';
import {
  clearDownloadHistory,
  exportDownloadHistory,
  getDownloadNumber,
  importDownloadHistory,
} from '@/utils/downloadHistory';
import { pickAndReadFile } from '@/utils/file';
import { showMessage } from '@/utils/elementPlus';
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

const { t, n, locale } = useI18n();

const show = ref(false);
const downloadedNum = ref(NaN);

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
  downloadedNum.value = await getDownloadNumber();
};

const open = () => {
  show.value = true;
  refreshDownloadNum();
};

const openHelp = () => {
  monkeyWindow.open(
    locale.value === 'zh'
      ? 'https://github.com/Tsuk1ko/nhentai-helper/blob/master/README-ZH.md#%E8%AE%BE%E7%BD%AE'
      : 'https://github.com/Tsuk1ko/nhentai-helper/blob/master/README.md#settings',
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

watch(
  () => settings.language,
  val => {
    locale.value = val;
  },
);

defineExpose({ open });
</script>

<style lang="less" scoped>
.nhentai-helper-setting-help-buttons {
  float: left;
  position: absolute;
}

.inline-item {
  display: inline-block;
  &:not(:last-of-type) {
    margin-right: 8px;
  }
  &__name {
    margin-right: 4px;
    user-select: none;
  }
}
</style>

<style lang="less">
#nhentai-helper-setting-dialog {
  .asterisk-example::before {
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
