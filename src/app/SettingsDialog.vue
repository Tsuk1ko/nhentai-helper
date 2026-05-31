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
        <CompressionFileName />
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
        <ConvertWebp />
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
        <!-- 已下载本子的标题颜色 -->
        <DownloadedTitleColor />
        <!-- 元数据文件 -->
        <MetaFile />
        <!-- 标题黑名单 -->
        <TitleBlacklist />
        <!-- 进阶设置 -->
        <el-divider>{{ t('setting.advanceTitle') }}</el-divider>
        <!-- 收集日志 -->
        <CollectLog />
        <!-- nHentai 下载节点 -->
        <NHentaiDownloadHost />
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
        <!-- 标题替换 -->
        <TitleReplacement />
        <!-- 自定义文件名函数 -->
        <CustomFilenameFunction />
      </el-form>
      <!-- 下载历史 -->
      <DownloadHistory />
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { GM_openInTab } from '$';
import {
  ElButton,
  ElCheckbox,
  ElDialog,
  ElDivider,
  ElForm,
  ElFormItem,
  ElInput,
  ElInputNumber,
  ElOption,
  ElSelect,
  ElSlider,
  ElSwitch,
} from 'element-plus';
import { useI18n } from 'petite-vue-i18n';
import { computed, ref, watch } from 'vue';
import {
  CollectLog,
  CompressionFileName,
  ConvertWebp,
  CustomFilenameFunction,
  DownloadedTitleColor,
  DownloadHistory,
  MetaFile,
  NHentaiDownloadHost,
  TitleBlacklist,
  TitleReplacement,
} from '@/components/settings';
import type { ElMarks } from '@/typings';
import {
  DISABLE_STREAM_DOWNLOAD,
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

const open = () => {
  show.value = true;
};

const openHelp = () => {
  GM_openInTab(
    locale.value === 'zh'
      ? 'https://github.com/Tsuk1ko/nhentai-helper/blob/master/README-ZH.md#%E8%AE%BE%E7%BD%AE'
      : 'https://github.com/Tsuk1ko/nhentai-helper/blob/master/README.md#settings',
    { active: true, setParent: true },
  );
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
