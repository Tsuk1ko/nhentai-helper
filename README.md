# nHentai Helper

[中文说明](https://github.com/Tsuk1ko/nhentai-helper/blob/master/README-ZH.md#readme)

Support Tampermonkey and Violentmonkey. Not and will not support Greasemonkey.

## Installation

[Via Greasy Fork](https://greasyfork.org/zh-CN/scripts/375992) (login required due to adult content)

[Via Github Pages](https://tsuk1ko.github.io/nhentai-helper/script.user.js)

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
- **Custom download URL**  
  **WARNING: Please don't set this if you don't know what it does.**  
  Tip: You may need to add your domain into *XHR security* for this script.  
  Provide a URL containing the following placeholder:
  - `{{mid}}` - Media ID
  - `{{index}}` - Page index, starting from 1
  - `{{ext}}` - Image file extension
- **Compression filename**  
  Default is `{{japanese}}.zip`. You can custom the naming of downloaded compression file, including the file extension, such as `{{english}}.cbz`.  
  Available placeholders:  
  - `{{english}}` - English name of manga
  - `{{japanese}}` - Japanese name of manga
  - `{{pretty}}` - English simple title of manga
  - `{{id}}` - Gallery ID
  - `{{pages}}` - Number of pages
- **Compression level**  
  Accept a numer in `0-9`, default is `0`.  
  `0` means "no compression", `1` means "best speed", `9` means "best compression".  
   Actually, for manga, compression output size of `0` and `9` usually differ by less than **1%**.
- **Filename length**  
  Zeros will be padded to the start of image filename when its length lower than the value you specified. This can avoid the sorting confusion caused by sorting only by string in some cases.  
  Accept a nonnegative integer or `auto`.
- **Auto cancel downloaded manga**  
  When you are going to download an already downloaded manga, it will be canceled automatically instead of pop-up a confirmation box.
- **Auto retry when error occurs**  
  Automatically retry when an error occurs, instead of pop-up a confirmation box.
- **Auto show all**  
  Help you to click the "Show all" button on manga detail page automatically.
- **Compression "streamFiles"**  
  Enable this option will use less memory but some program might not support the generated zip file.  
  See [here](https://stuk.github.io/jszip/documentation/api_jszip/generate_async.html#streamfiles-option) for more information.
- **Series mode**  
  Enable this option will make downloading and compression become series tasks but not parallel to reduce memory usage.  
  If `RangeError: Array buffer allocation failed` occurs frequently, you can try to enable it.

## Other features

### nHentai mirror sites support

This script also support some nHentai mirror sites such as NyaHentai. See the script's `@match` and `@include`.

If the script does not run on some domains, you can add them to *User matches*, find the correct image URL and set *Custom Download URL*.

### Language filter

You can select a language in the navigation bar to filter mangas.

![langFilter](https://raw.githubusercontent.com/Tsuk1ko/nhentai-helper/master/docs/langFilter.png)

### 100% view height

Effective when reading online, only for mirror sites (now nHentai already has this feature).

![viewMode](https://raw.githubusercontent.com/Tsuk1ko/nhentai-helper/master/docs/viewMode.png)

## Recommended scripts

- [Super-preloader](https://github.com/machsix/Super-preloader)  
  Let you have unlimited drop-down page turning experience in the manga list page.
