# nHentai Helper

[中文说明](https://github.com/Tsuk1ko/nhentai-helper/blob/master/README-ZH.md#readme)

[GitHub](https://github.com/Tsuk1ko/nhentai-helper)

Support [Tampermonkey](https://www.tampermonkey.net/) and [Violentmonkey](https://violentmonkey.github.io/). Not and will not support Greasemonkey.

## Installation

[Via Greasy Fork](https://greasyfork.org/scripts/375992) (login required due to adult content)

[Via Sleazy Fork](https://sleazyfork.org/scripts/375992) (no login required)

[Via GitHub Pages](https://nhelper.lolicon.app/script.user.js)

## Main features

- You can download manga as zip (or cbz). **You must keep the page in the foreground when downloading.**
- You will be warned when you are going to download an already downloaded manga.
- For manga list page:
  - Add pjax support. Changing pages will not interrupt downloads.
  - Download queue support.
  - The caption of downloaded manga will be marked with grey color.

![preview1](https://raw.githubusercontent.com/Tsuk1ko/nhentai-helper/master/docs/preview1.png)

![preview2](https://raw.githubusercontent.com/Tsuk1ko/nhentai-helper/master/docs/preview2.png)

## Settings

![settings](https://raw.githubusercontent.com/Tsuk1ko/nhentai-helper/master/docs/settings.png)

- **Download thread**  
  If you think the download speed is too slow, you can try to increase the number of download threads from this setting.
- **Open on new tab**  
  Gallery page will be open on a new window by default, turn off it if you don't like it.
- **Compression filename**  
  Default is `{{japanese}}.zip`. You can custom the naming of downloaded compression file, including the file extension, such as `{{english}}.cbz`.  
  If the compressed file's name contains illegal characters, they will be automatically replaced with spaces. You can also use the *Title replacement* setting to perform custom replacement.  
  Available placeholders:  
  - `{{english}}` - English name of manga
  - `{{japanese}}` - Japanese name of manga
  - `{{pretty}}` - English simple title of manga
  - `{{id}}` - Gallery ID
  - `{{pages}}` - Number of pages
  - `{{artist}}` - Artist tags of manga
    - Maximum number: The default is `3`, exceeding will become "various". Can be modify in settings. `0` means infinity.
    - Separator: The default is `, `. Can be modify in settings.
- **Compression level**  
  Accept a number in `0-9`, default is `0`.  
  `0` means "no compression", `1` means "best speed", `9` means "best compression".  
   Actually, for manga, compression output size of `0` and `9` usually differ by less than **1%**.
- **Filename length**  
  Zeros will be padded to the start of image filename when its length lower than the value you specified. This can avoid the sorting confusion caused by sorting only by string in some cases.
- **Convert webp to**  
  nHentai has started to use webp format images. If your image viewer or comic reader doesn't support webp format, you can set this to convert webp to jpg or png.  
  This is enabled by default and converts to jpg at 85% quality.
- **Remove ads pages**  
  Try to detect and remove ads pages. The principle is to detect whether there is an advertising QR code on the page. Regular URL such as fanbox will not be removed.  
  Main code comes from [hymbz/ComicReadScript](https://github.com/hymbz/ComicReadScript), thanks for such a great project. The relevant code is open source under [AGPL-3.0](https://github.com/hymbz/ComicReadScript/blob/master/LICENSE).
- **Auto cancel downloaded manga**  
  When you are going to download an already downloaded manga, it will be canceled automatically instead of pop-up a confirmation box.
- **Auto retry when error occurs**  
  Automatically retry when an error occurs, instead of pop-up a confirmation box.
- **Auto show all**  
  Help you to click the "Show all" button on manga detail page automatically.
- **Show ignore button**  
  Show an button that allow you to mark or unmark the manga as downloaded.
- **Context menu preview**  
  Able to preview information and thumbnails directly by right click a manga on manga list page.
- **Judge downloaded manga by title**  
  You can specify the title used to judge whether the manga has been downloaded. If nothing selected, the script will never warn you when a manga has been downloaded.  
  Note that `Pretty` is not available in most mirror sites.
- **Add metadata file**  
  These metadata files are currently supported:
  - ComicInfo.xml (v2.1 from [anansi-project/comicinfo](https://github.com/anansi-project/comicinfo))
  - info.json (eze style, not guaranteed to work properly)

  If you choose to add ComicInfo.xml, you need to specify the title language (english or japanese).

### Advance Settings

- **nHentai download host**  
  Choose a host for downloading nHentai images. Only available on nHentai.  
  Currently, nHentai CDNs are not fully synchronized, so it is recommended to use "Auto".
- **Custom download URL**  
  Generally, you don't need to provide this unless you have a special requirement or the script cannot automatically obtain the image URL on the mirror site.  
  Provide a URL containing the following placeholder:
  - `{{mid}}` - Media ID
  - `{{index}}` - Page index, starting from 1
  - `{{ext}}` - Image file extension

  For example, if the image URL you find is like `https://example.com/galleries/123456/1.jpg`  
  Then the custom download URL is usually `https://example.com/galleries/{{mid}}/{{index}}.{{ext}}`
- **Compression "streamFiles"**  
  Enable this option will use less memory but some program might not support the generated zip file.  
  See [here](https://stuk.github.io/jszip/documentation/api_jszip/generate_async.html#streamfiles-option) for more information.
- **Series mode**  
  Enable this option will make downloading and compression become series tasks but not parallel to reduce memory usage.  
  If `RangeError: Array buffer allocation failed` occurs frequently, you can try to enable it.
- **Stream download**  
  Use [StreamSaver.js](https://github.com/jimmywarting/StreamSaver.js) to download zip stream to reduce memory usage.  
  But this not work on Safari and Firefox, and the download process is **extremely slow**. So not recommended unless you really have memory usage issues.
- **Prevent console clearing**  
  Only available on nHentai official site. It is useful when you need to submit console log for debugging.
- **Title replacement**  
  Character replacement can be performed on the title in the compressed file's name, and regular expressions are supported.
- **Custom filename function**  
  You can write a JavaScript function to customize the final compressed file's name.  
  It must return a non empty string, otherwise the script will throw an error  
  It accepts 2 parameters:
  - `filename` - Original filename string, obtained by *Compression filename* and *Title replacement*
  - `gallery` - nHentai gallery information object, [see definition](https://github.com/Tsuk1ko/nhentai-helper/blob/master/src/utils/nhentai.ts#L56-L74)

## Other features

### nHentai mirror sites support

This script also support some nHentai mirror sites. See the script's `@match` and `@include`.

If the script does not run on some domains, you can add them to *User matches*. (Script editing - Settings - Includes/Excludes - User matches)

Not all mirror sites are supported. The script only supports sites that use the same UI as the nHentai official site (page structure and element class names are basically the same).

When you are on a mirror site, a prompt "A userscript wants to access a cross-origin resource" may pop up, please select "**Always allow domain**" or "**Always allow all domain**".

![connect](https://raw.githubusercontent.com/Tsuk1ko/nhentai-helper/master/docs/connect.en.png)

### Language filter

You can select a language in the navigation bar to filter manga.

![langFilter](https://raw.githubusercontent.com/Tsuk1ko/nhentai-helper/master/docs/langFilter.png)

### 100% view height

Effective when reading online, only for mirror sites (now nHentai official site already has this feature).

![viewMode](https://raw.githubusercontent.com/Tsuk1ko/nhentai-helper/master/docs/viewMode.png)

## Recommended scripts

- [Super-preloader](https://github.com/machsix/Super-preloader)  
  A userscript for auto loading paginated web pages. It will join pages together, which is useful on manga list page.
