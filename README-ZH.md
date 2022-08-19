# nHentai 助手

支持 Tampermonkey 和 Violentmonkey，不支持也不会支持 Greasemonkey

## 安装

[从 Greasy Fork 安装](https://greasyfork.org/scripts/375992)（由于成人内容，需要登录才能安装）

[从 Github Pages 安装](https://tsuk1ko.github.io/nhentai-helper/script.user.js)

## 主要功能

- 为 nHentai 增加 zip (cbz) 打包下载方式，**下载时必须保持页面处于前台**
- 当你下载了一个之前下载过的**同名**本子时将会弹出提醒，此时你可以选择不下载
- 本子列表页相关
  - 支持 pjax，翻页不会中断本子下载
  - 下载队列功能
  - 下载过的本子标题会置灰

![preview1](https://raw.githubusercontent.com/Tsuk1ko/nhentai-helper/master/docs/preview1.png)

![preview2](https://raw.githubusercontent.com/Tsuk1ko/nhentai-helper/master/docs/preview2.png)

## 设置

![settings](https://raw.githubusercontent.com/Tsuk1ko/nhentai-helper/master/docs/settings.png)

- **Download thread 下载线程数**  
  如果你觉得下载太慢，可以适当提高线程数，不过你得清楚，挂（一个好一点的）代理才是拯救辣鸡网络的实在方法
- **Open on new tab 在新选项卡打开**  
  本子详情页会默认变为在新选项卡中打开，如果不喜欢就关掉它
- **Custom download URL 自定义下载链接**  
  **警告：不知道这是做什么的就不要动**  
  提示：你可能还需要往脚本设置的 *XHR 安全* 中加入域名  
  提供一个包含以下占位符的 URL：
  - `{{mid}}` - Media ID
  - `{{index}}` - 页号
  - `{{ext}}` - 图片扩展名
- **Compression filename 压缩文件名**  
  默认是`{{japanese}}.zip`，可自定义下载下来的压缩文件的文件名，包括扩展名，比如`{{english}}.cbz`  
  支持的占位符：  
  - `{{english}}` - 本子英文名
  - `{{japanese}}` - 本子日文名
  - `{{pretty}}` - 本子英文简略标题
  - `{{id}}` - 本子 ID
  - `{{pages}}` - 本子页数
- **Compression level 压缩等级**  
  范围为`0-9`，`0`是无压缩，`1`是最快压缩，`9`是最好压缩，默认为`0`  
  其实对于本子，`0`和`9`压出来的文件大小差别通常不到 **1%**
- **Filename length 文件名长度**  
  图片文件名小于这个长度时会自动补 0，可以避免某些场景下只按字符串排序所导致的排序混乱问题  
  可设置一个大于等于 0 的数或 `auto`，`auto` 时会根据本子最大页数智能补 0
- **Auto cancel downloaded manga 自动取消下载过的本子**  
  当你下载了一个之前下载过的**同名**本子时将会自动取消下载，而不是弹出选择对话框
- **Auto retry when error occurs 发生错误时自动重试**  
  当错误发生时自动重试，而不是弹出选择对话框
- **Auto show all 自动显示全部**  
  本子详情页自动帮你点击“Show all”按钮
- **Compression "streamFiles" 压缩 "streamFiles" 选项**  
  启用这个选项可以减少内存消耗，但可能导致某些压缩软件不支持生成的压缩文件，详见[说明](https://stuk.github.io/jszip/documentation/api_jszip/generate_async.html#streamfiles-option)
- **Series mode 串行模式**  
  启用这个选项可以使下载和压缩变为串行任务以减少内存消耗  
  如果经常出现 `RangeError: Array buffer allocation failed` 错误，可以尝试启用它
- **Show ignore button 显示忽略按钮**
  会显示一个忽略按钮，能让你手动标记或取消标记这个本子为已下载的

## 其他功能

### 镜像站支持

同时支持部分镜像站如 NyaHentai 等，具体见脚本的 `@match` 与 `@include`

如脚本没有在你使用的域名上运行，可自行将网址加入 *用户匹配*，并自行找出本子原图地址，设置 *自定义下载链接*

### 语言过滤

你可以在导航栏中选择一个语言来过滤本子

![langFilter](https://raw.githubusercontent.com/Tsuk1ko/nhentai-helper/master/docs/langFilter.png)

### 100% 视图高度

在线阅读时可开启或关闭，只在第三方镜像站生效，nHentai 官方已经有这个功能了

![viewMode](https://raw.githubusercontent.com/Tsuk1ko/nhentai-helper/master/docs/viewMode.png)

## 推荐脚本

- [Super-preloader](https://github.com/machsix/Super-preloader)  
  支持在本子列表页无限下拉翻页
