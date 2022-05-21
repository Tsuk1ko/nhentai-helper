# nHentai 助手

支持 Tampermonkey 和 Violentmonkey，不支持也不会支持 Greasemonkey

## 主要功能

- 为 nHentai 增加 zip (cbz) 打包下载方式，**下载时必须保持页面处于前台**
- 当你下载了一个之前下载过的**同名**本子时将会弹出提醒，此时你可以选择不下载
- 本子列表页相关
  - 支持 pjax，翻页不会中断本子下载
  - 下载队列功能
  - 下载过的本子标题会置灰

![](https://i.loli.net/2019/01/26/5c4c5d5914197.png)

![](https://i.loli.net/2018/12/26/5c23a39505d14.png)

## 设置

![](https://i.loli.net/2020/02/18/iZKI9hfcLymdrBj.png)

1. **Download thread 下载线程数**  
   如果你觉得下载太慢，可以适当提高线程数，不过你得清楚，挂（一个好一点的）代理才是拯救辣鸡网络的实在方法
2. **Open on new tab 在新选项卡打开**  
   本子详情页会默认变为在新选项卡中打开，如果不喜欢就关掉它
3. **Custom download URL 自定义下载链接**  
   **警告：不知道这是做什么的就不要动**  
   提示：你可能还需要往脚本设置的 *XHR 安全* 中加入域名  
   提供一个包含以下占位符的 URL：
   - `{{mid}}` - Media ID
   - `{{index}}` - 页号
   - `{{ext}}` - 图片扩展名
4. **Compression filename 压缩文件名**  
   默认是`{{japanese}}.zip`，可自定义下载下来的压缩文件的文件名，包括扩展名，比如`{{english}}.cbz`  
   支持的占位符：  
   - `{{english}}` - 本子英文名
   - `{{japanese}}` - 本子日文名
   - `{{pretty}}` - 本子英文简略标题
   - `{{id}}` - 本子 ID
   - `{{pages}}` - 本子页数
5. **Compression level 压缩等级**  
   范围为`0-9`，`0`是无压缩，`1`是最快压缩，`9`是最好压缩，默认为`0`  
   其实对于本子，`0`和`9`压出来的文件大小差别通常不到 **1%**
6. **Filename length 文件名长度**  
   图片文件名小于这个长度时会自动补`0`，可以避免某些场景下只按字符串排序所导致的排序混乱问题
7. **Auto cancel downloaded doujin 自动取消下载过的本子**  
   当你下载了一个之前下载过的**同名**本子时将会自动取消下载，而不是弹出选择对话框
8. **Auto retry when error occurs 发生错误时自动重试**  
   当错误发生时自动重试，而不是弹出选择对话框

## 其他功能

### 镜像站支持

同时支持部分镜像站如 NyaHentai 等，如脚本没有在你使用的域名上运行，可自行将网址加入 *用户匹配*，并自行找出本子原图地址，设置 *自定义下载链接*

> 坏消息是，这个脚本近期在**所有镜像站的本子列表页**和**部分镜像站的本子详情页**将无法使用。获取本子元信息依赖 nHentai 官方 API（除了某些镜像站的详情页和 nHentai 原站一样自带本子元信息），因此必须使用跨域反代服务进行请求，而近日这些反代服务的请求会被 CloudFlare 拦截，只能等什么时候 nHentai 心情好降低 CloudFlare 的严格程度了。

### 语言过滤

你可以在导航栏中选择一个语言来过滤本子

![](https://i.loli.net/2019/03/25/5c98d07cca0ac.png)

### 100% 视图高度

在线阅读时可开启或关闭，只在第三方镜像站生效，nHentai 官方已经有这个功能了

![](https://i.loli.net/2019/09/04/EYu5iP9L46b8XUf.png)

## 推荐脚本

- [Super-preloader](https://github.com/machsix/Super-preloader)  
  支持在本子列表页无限下拉翻页
