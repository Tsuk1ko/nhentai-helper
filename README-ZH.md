# nHentai 助手

[GitHub](https://github.com/Tsuk1ko/nhentai-helper)

支持 [Tampermonkey](https://www.tampermonkey.net/) 和 [Violentmonkey](https://violentmonkey.github.io/)，不支持也不会支持 Greasemonkey

## 安装

[从 Greasy Fork 安装](https://greasyfork.org/scripts/375992)（由于成人内容，需要登录才能安装）

[从 Sleazy Fork 安装](https://sleazyfork.org/scripts/375992)（不需要登录）

[从 GitHub Pages 安装](https://nhelper.lolicon.app/script.user.js)

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

在设置面板中，带星号`*`的设置项需要刷新页面才能生效

- **下载线程数**  
  如果你觉得下载太慢，可以适当提高线程数，不过你得清楚，挂（一个好一点的）代理才是拯救辣鸡网络的实在方法
- **在新选项卡打开**  
  本子详情页会默认变为在新选项卡中打开，如果不喜欢就关掉它
- **压缩文件名**  
  默认是`{{japanese}}.zip`，可自定义下载下来的压缩文件的文件名，包括扩展名，比如`{{english}}.cbz`  
  如果压缩文件名中含有文件名非法字符则会自动被替换成空格，你也可以利用「标题替换」设置进行自定义替换  
  支持的占位符：  
  - `{{english}}` - 本子英文名
  - `{{japanese}}` - 本子日文名
  - `{{pretty}}` - 本子英文简略标题
  - `{{id}}` - 本子 ID
  - `{{pages}}` - 本子页数
  - `{{artist}}` - 作者 tag
    - 最大数量：默认 `3`，`0` 代表不限制，超出将变为“various”，可在设置中修改
    - 分隔符：默认 `, `，可在设置中修改
- **压缩等级**  
  范围为`0-9`，`0`是无压缩，`1`是最快压缩，`9`是最好压缩，默认为`0`  
  其实对于本子，`0`和`9`压出来的文件大小差别通常不到 **1%**
- **文件名长度**  
  图片文件名小于这个长度时会自动补 0，可以避免某些场景下只按字符串排序所导致的排序混乱问题
- **转换 webp 为**  
  nHentai 已经陆续开始启用 webp 格式的图片，若你的图片查看器或漫画阅读器不支持 webp 格式，则可以设置该项将 webp 转换为 jpg 或 png  
  该设置项默认开启，默认转换为 85% 质量的 jpg
- **自动取消下载过的本子**  
  当你下载了一个之前下载过的**同名**本子时将会自动取消下载，而不是弹出选择对话框
- **发生错误时自动重试**  
  当错误发生时自动重试，而不是弹出选择对话框
- **自动显示全部**  
  本子详情页自动帮你点击“Show all”按钮
- **显示忽略按钮**  
  会显示一个忽略按钮，能让你手动标记或取消标记这个本子为已下载的
- **右击预览**  
  在本子列表页右击本子可以直接预览本子信息和内容缩略图
- **用标题判断本子是否下载过**  
  你可以指定用来判断本子是否下载过所使用的标题，如果全不选则可以关闭提醒本子下载过的功能；需要注意 `简略` 在大部分镜像站是无效的
- **添加元数据文件**  
  目前支持添加这些元数据文件：
  - ComicInfo.xml (v2.1 from [anansi-project/comicinfo](https://github.com/anansi-project/comicinfo))
  - info.json (eze 样式，不保证能正常工作)

  若添加 ComicInfo.xml 则需要指定标题语言（英语或日语）

### 进阶设置

- **nHentai 下载节点**  
  可以切换下载 nHentai 图片的节点，仅在 nHentai 有效
- **自定义下载地址**  
  一般情况下不需要填写这个，除非有特殊需求，或者脚本无法在镜像站上自动获取图片下载地址  
  提供一个包含以下占位符的 URL：
  - `{{mid}}` - Media ID
  - `{{index}}` - 页号
  - `{{ext}}` - 图片扩展名

  例如你自行找到的图片地址为这样的形式 `https://example.com/galleries/123456/1.jpg`  
  那么自定义下载地址通常为 `https://example.com/galleries/{{mid}}/{{index}}.{{ext}}`
- **压缩 "streamFiles" 选项**  
  启用这个选项可以减少内存消耗，但可能导致某些压缩软件不支持生成的压缩文件，详见[说明](https://stuk.github.io/jszip/documentation/api_jszip/generate_async.html#streamfiles-option)
- **串行模式**  
  启用这个选项可以使下载和压缩变为串行任务以减少内存消耗  
  如果经常出现 `RangeError: Array buffer allocation failed` 错误，可以尝试启用它
- **流式下载**  
  利用 [StreamSaver.js](https://github.com/jimmywarting/StreamSaver.js) 直接下载压缩流来减少内存占用  
  在 Safari 和 Firefox 上无法使用，且下载速度**极慢**，因此不推荐启用除非真的有内存消耗问题
- **阻止控制台清空**  
  只在 nHentai 官方站点可用（需要），当你需要提交控制台日志来定位问题的时候请启用它
- **标题替换**  
  可以对压缩文件名中的标题进行字符替换，支持正则表达式
- **自定义文件名函数**  
  你可以编写一个 JavaScript 函数来自定义最终的压缩文件名  
  该函数必须返回一个非空字符串，否则脚本会抛出错误  
  该函数接受两个参数
  - `filename` - 原始文件名字符串，由 *压缩文件名* 和 *标题替换* 作用得到
  - `gallery` - 本子信息对象，[查看定义](https://github.com/Tsuk1ko/nhentai-helper/blob/master/src/utils/nhentai.ts#L56-L74)

## 其他功能

### 镜像站支持

该脚本支持部分镜像站，具体见脚本的 `@match` 与 `@include`

如脚本没有在你使用的域名上运行，可自行将网址加入 *用户匹配*（脚本编辑-设置-包括/排除-用户匹配-添加）

并不是所有镜像站都支持，脚本仅支持跟 nHentai 官方站点使用同一套 UI（页面结构、元素类名基本一致）的镜像站，不符合的站点不支持

在镜像站使用时，可能会弹出“一个用户脚本试图访问跨源资源”的提示，请选择“**总是允许此域名**”或“**总是允许全部域名**”

![connect](https://raw.githubusercontent.com/Tsuk1ko/nhentai-helper/master/docs/connect.zh.png)

### 语言过滤

你可以在导航栏中选择一个语言来过滤本子

![langFilter](https://raw.githubusercontent.com/Tsuk1ko/nhentai-helper/master/docs/langFilter.png)

### 100% 视图高度

在线阅读时可开启或关闭，只在第三方镜像站生效，nHentai 官方已经有这个功能了

![viewMode](https://raw.githubusercontent.com/Tsuk1ko/nhentai-helper/master/docs/viewMode.png)

## 推荐脚本

- [Super-preloader](https://github.com/machsix/Super-preloader)  
  支持在本子列表页无限下拉翻页
