# nHentai Helper

Also support NyaHentai.

Notice: For some special reasons, Violentmonkey cannot be run on nHentai at present, please use Tampermonkey instead.

## Main features

1. You can download doujin as ZIP (CBZ).
2. Add pjax support on dojin list page. Turning pages will not interrupt downloads.
3. Download queue support on dojin list page. It will warn you when you download a doujin which was already downloaded, even they were uploaded by different people but are the same doujin. Up to 500 history records.

![](https://i.loli.net/2019/01/26/5c4c5d5914197.png)

![](https://i.loli.net/2018/12/26/5c23a39505d14.png)

## Setting

![](https://i.loli.net/2020/02/18/iZKI9hfcLymdrBj.png)

1. **Download Thread**  
   If you think the download speed is too slow, you can try to increase the number of download threads from this setting.
2. **Open On New Tab**  
   Gallery page will be open on a new window by default, turn off it if you don't like it.
3. **Custom Download URL**  
   **WARNING: Please don't set this if you don't know what it does.**  
   Tip: You may need to add your domain into *XHR security* for this script.  
   Provide a string containing the following placeholder:
   - `{{mid}}` - Media ID
   - `{{index}}` - Page index, starting from 1
   - `{{ext}}` - Image file extension
4. **Compression File Extension**  
   Default is `zip`. You can custom it, such as `cbz`.
5. **Compression Level**  
   Accept a numer in `0-9`, default is `0`.  
   `0` means "no compression", `1` means "best speed", `9` means "best compression".  
   Actually, for doujin, compression output size of `0` and `9` usually differ by less than **1%**.

## Other features

### Language filter

You can select a language in the navigation bar to filter doujins.

![](https://i.loli.net/2019/03/25/5c98d07cca0ac.png)

### 100% view height

Effective when reading online.

![](https://i.loli.net/2019/09/04/EYu5iP9L46b8XUf.png)

### Removing console shielding of nhentai

Too lazy to translate all of them :(

有尝试为 nhentai 开发脚本的朋友应该也会头疼这个问题，nhentai 会不停的执行`console.clear`，即使你`console.clear=()=>{}`，也仍然会每秒 log 出一个`<div></div>`，很是烦人

在我刚开始开发这个脚本的时候我的解决方法非常暴力，将那个罪魁祸首 js 下载一份传到我自己的服务器上，删掉里面调用了`console`的代码，然后用重定向插件进行重定向，这样可以保证不会破坏`console`

但该 js 也会时不时更新，我也得重新更新，虽然更新频率很低，总归是很麻烦的

于是我还是决定使用一劳永逸的方法，这一方法你可以在脚本源码开头看到，因为其会对`console`进行一些破坏性的改动，因此我在这里进行专门说明

**You just need to pay attention to these:**

1. If you want to use `console.clear`, please use `console._clear` instead.
2. If you want to `console.log` a `Node` or `HTMLElement`, please use `console._log` or `console.info` instead.
