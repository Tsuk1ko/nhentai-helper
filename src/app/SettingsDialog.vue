<template>
  <el-dialog id="nhentai-helper-setting-dialog-outside" v-model="show" :center="true" top="50px">
    <template #header="{ titleId, titleClass }">
      <div class="nhentai-helper-setting-help-buttons no-sl">
        <el-button size="small" @click="openHelp">{{ t('setting.helpButton') }}</el-button>
      </div>
      <span :id="titleId" class="no-sl" :class="[titleClass]">{{ t('setting.title') }}</span>
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
        <!-- 转换 webp -->
        <el-form-item :label="t('setting.convertWebpTo')">
          <el-radio-group v-model="settings.convertWebpTo">
            <el-radio value="">{{ t('common.disabled') }}</el-radio>
            <el-radio :value="MIME.JPG">jpg</el-radio>
            <el-radio :value="MIME.PNG">png</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          v-if="settings.convertWebpTo === MIME.JPG"
          :label="`└ ${t('setting.convertWebpQuality')} (0~100)`"
        >
          <el-input-number
            v-model="settings.convertWebpQuality"
            size="small"
            :min="0"
            :max="100"
            :value-on-clear="settingDefinitions.convertWebpQuality.default"
            :step-strictly="true"
          />
        </el-form-item>
        <!-- 移除广告页 -->
        <el-form-item :label="t('setting.removeAdPage')">
          <el-switch v-model="settings.removeAdPage" />
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
        <!-- 右击预览 -->
        <el-form-item :label="t('setting.galleryContextmenuPreview')">
          <el-switch v-model="settings.galleryContextmenuPreview" />
        </el-form-item>
        <!-- 已下载判断 key -->
        <el-form-item :label="t('setting.judgeDownloadedMangaByTitle')">
          <el-checkbox v-model="settings.judgeDownloadedByEnglish" :label="t('common.english')" />
          <el-checkbox v-model="settings.judgeDownloadedByJapanese" :label="t('common.japanese')" />
          <el-checkbox v-model="settings.judgeDownloadedByPretty" :label="t('common.pretty')" />
        </el-form-item>
        <!-- 添加元数据文件 -->
        <el-form-item :label="t('setting.addMetaFile')">
          <el-checkbox-group v-model="settings.addMetaFile">
            <el-checkbox label="ComicInfo.xml" value="ComicInfoXml" />
            <el-checkbox label="info.json (eze)" value="EzeInfoJson" />
          </el-checkbox-group>
        </el-form-item>
        <!-- 元数据标题语言 -->
        <el-form-item
          v-if="settings.addMetaFile.includes('ComicInfoXml')"
          :label="`└ ${t('setting.metaFileTitleLanguage')}`"
        >
          <el-select v-model="settings.metaFileTitleLanguage">
            <el-option :label="t('common.english')" value="english" />
            <el-option :label="t('common.japanese')" value="japanese" />
          </el-select>
        </el-form-item>
        <!-- 进阶设置 -->
        <el-divider>{{ t('setting.advanceTitle') }}</el-divider>
        <!-- nHentai 下载节点 -->
        <el-form-item v-if="IS_NHENTAI" :label="t('setting.nHentaiDownloadHost')">
          <el-select
            v-model="settings.nHentaiDownloadHost"
            :disabled="!!settings.customDownloadUrl"
          >
            <el-option
              v-for="value in nHentaiDownloadHostSpecials"
              :key="value"
              :label="t(`setting.nHentaiDownloadHostOption.${value}`)"
              :value="value"
            />
            <el-option
              v-for="host in nHentaiDownloadHosts"
              :key="host"
              :label="host"
              :value="host"
            />
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
        <!-- 标题替换 -->
        <el-collapse>
          <el-collapse-item>
            <template #title>
              <span
                style="
                  color: var(--el-text-color-regular);
                  font-size: var(--el-form-label-font-size);
                "
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
        <!-- 自定义文件名函数 -->
        <el-form-item :label="t('setting.customFilenameFunction')">
          <span class="monospace"
            >function (filename<el-text type="info">: string</el-text>, gallery<el-text type="info"
              >:
              <el-link
                type="primary"
                href="https://github.com/Tsuk1ko/nhentai-helper/blob/df00acb0d5ad8244d408561410b3c647d5af7ed4/src/utils/nhentai.ts#L57-L75"
                target="_blank"
                >NHentaiGallery</el-link
              ></el-text
            >) {</span
          >
          <el-input
            v-model="settings.customFilenameFunction"
            class="monospace"
            type="textarea"
            placeholder="return filename;"
            :autosize="{ minRows: 1 }"
          />
          <span class="monospace">}</span>
        </el-form-item>
      </el-form>
      <el-divider>{{ t('setting.history.title') }}</el-divider>
      <p class="no-sl">
        {{
          t('setting.history.downloadedNumberTip', {
            num: Number.isNaN(downloadedNum)
              ? downloadedNum
              : numberFormatter.format(downloadedNum),
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
      <ConfirmPopup @confirm="clearHistory">
        <el-button type="danger" :icon="Delete" :loading="clearing">{{
          t('setting.history.clear')
        }}</el-button>
      </ConfirmPopup>
      <p class="no-sl">{{ t('setting.history.importTip') }}</p>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { Delete, Download, Upload } from '@element-plus/icons-vue';
import { GM_openInTab } from '$';
import {
  ElButton,
  ElCheckbox,
  ElCheckboxGroup,
  ElCollapse,
  ElCollapseItem,
  ElDialog,
  ElDivider,
  ElForm,
  ElFormItem,
  ElInput,
  ElInputNumber,
  ElLink,
  ElOption,
  ElRadio,
  ElRadioGroup,
  ElSelect,
  ElSlider,
  ElSwitch,
  ElTable,
  ElTableColumn,
  ElText,
} from 'element-plus';
import { useI18n } from 'petite-vue-i18n';
import { computed, ref, watch } from 'vue';
import ConfirmPopup from '@/components/ConfirmPopup.vue';
import { IS_NHENTAI } from '@/const';
import { MIME } from '@/typings';
import type { ElMarks } from '@/typings';
import {
  clearDownloadHistory,
  exportDownloadHistory,
  getDownloadNumber,
  importDownloadHistory,
} from '@/utils/downloadHistory';
import { showMessage } from '@/utils/elementPlus';
import { pickAndReadFile } from '@/utils/file';
import { numberFormatter } from '@/utils/formatter';
import {
  DISABLE_STREAM_DOWNLOAD,
  nHentaiDownloadHosts,
  nHentaiDownloadHostSpecials,
  settingDefinitions,
  writeableSettings as settings,
  startWatchSettings,
} from '@/utils/settings';

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

const { t, locale } = useI18n();

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
  GM_openInTab(
    locale.value === 'zh'
      ? 'https://github.com/Tsuk1ko/nhentai-helper/blob/master/README-ZH.md#%E8%AE%BE%E7%BD%AE'
      : 'https://github.com/Tsuk1ko/nhentai-helper/blob/master/README.md#settings',
    { active: true, setParent: true },
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

const addTitleReplacement = () => {
  settings.titleReplacement.push({ from: '', to: '', regexp: false });
};

const delTitleReplacement = (index: number) => {
  settings.titleReplacement.splice(index, 1);
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

.monospace {
  font-family: monospace;
  span& {
    user-select: none;
  }
}

.code-type {
  color: var(--el-text-color-secondary);
}
</style>

<style lang="less">
#nhentai-helper-setting-dialog-outside {
  width: 80%;
  max-width: 800px;
  .no-sl {
    user-select: none;
  }
}

#nhentai-helper-setting-dialog {
  .asterisk-example::before {
    content: '*';
    color: var(--el-color-danger);
    margin-right: 4px;
  }
  label {
    font-weight: unset;
  }
  input:not([type='file']):not([type='checkbox']),
  textarea {
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
    &__content {
      .el-link.is-underline:hover:after {
        bottom: 8px;
      }
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
  .el-form-item__label {
    user-select: none;
  }
  .el-table {
    .el-input__prefix,
    .el-input__suffix {
      line-height: 30px;
    }
  }
  .el-table__empty-block {
    display: none;
  }
  .el-link {
    color: var(--el-link-text-color);
    &:hover {
      color: var(--el-link-hover-text-color);
    }
  }
  .el-collapse-item__header {
    font-family: inherit;
  }
}

.el-select-dropdown {
  user-select: none;
}
</style>
