# nHentai Helper

Support Tampermonkey and Violentmonkey. Not and will not support Greasemonkey.

## Main features

- You can download manga as zip (or cbz). **You must keep the page in the foreground when downloading.**
- You will be warned when you are going to download an already downloaded manga.
- For manga list page:
  - Add pjax support. Changing pages will not interrupt downloads.
  - Download queue support.
  - The caption of downloaded manga will be marked with grey color.

![](https://i.loli.net/2019/01/26/5c4c5d5914197.png)

![](https://i.loli.net/2018/12/26/5c23a39505d14.png)

## Setting

![](https://i.loli.net/2020/02/18/iZKI9hfcLymdrBj.png)

1. **Download thread**  
   If you think the download speed is too slow, you can try to increase the number of download threads from this setting.
2. **Open on new tab**  
   Gallery page will be open on a new window by default, turn off it if you don't like it.
3. **Custom download URL**  
   **WARNING: Please don't set this if you don't know what it does.**  
   Tip: You may need to add your domain into *XHR security* for this script.  
   Provide a URL containing the following placeholder:
   - `{{mid}}` - Media ID
   - `{{index}}` - Page index, starting from 1
   - `{{ext}}` - Image file extension
4. **Compression filename**  
   Default is `{{japanese}}.zip`. You can custom the naming of downloaded compression file, including the file extension, such as `{{english}}.cbz`.  
   Available placeholders:  
   - `{{english}}` - English name of manga
   - `{{japanese}}` - Japanese name of manga
   - `{{pretty}}` - English simple title of manga
   - `{{id}}` - Gallery ID
   - `{{pages}}` - Number of pages
5. **Compression level**  
   Accept a numer in `0-9`, default is `0`.  
   `0` means "no compression", `1` means "best speed", `9` means "best compression".  
   Actually, for manga, compression output size of `0` and `9` usually differ by less than **1%**.
6. **Compression "streamFiles"**  
   Enable this option will use less memory but some program might not support the generated zip file.  
   See [here](https://stuk.github.io/jszip/documentation/api_jszip/generate_async.html#streamfiles-option) for more information.
7. **Series mode**  
   Enable this option will make downloading and compression become series tasks but not parallel to reduce memory usage.  
   If `RangeError: Array buffer allocation failed` occurs frequently, you can try to enable it.
8. **Filename length**  
   Zeros will be padded to the start of image filename when its length lower than the value you specified. This can avoid the sorting confusion caused by sorting only by string in some cases.  
   Accept a nonnegative integer or `auto`.
9. **Auto cancel downloaded manga**  
   When you are going to download an already downloaded manga, it will be canceled automatically instead of pop-up a confirmation box.
10. **Auto retry when error occurs**  
   Automatically retry when an error occurs, instead of pop-up a confirmation box.
11. **Auto show all**  
   Help you to click the "Show all" button on manga detail page automatically.

## Other features

### nHentai mirror sites support

This script also support some nHentai mirror sites such as NyaHentai. If the script does not run on some domains, you can add them to *User matches*, find the correct image URL and set *Custom Download URL*.

> A bad news: This script will not be available on **the manga list page of all mirror sites** and **the manga details page of some mirror sites** in the near future. I'm too lazy to explain the full reason in English. In simple terms it's because of CloudFlare and there's nothing I can do about it.

### Language filter

You can select a language in the navigation bar to filter mangas.

![](https://i.loli.net/2019/03/25/5c98d07cca0ac.png)

### 100% view height

Effective when reading online, only for mirror sites (now nHentai already has this feature).

![](https://i.loli.net/2019/09/04/EYu5iP9L46b8XUf.png)

## Recommended scripts

- [Super-preloader](https://github.com/machsix/Super-preloader)  
  Let you have unlimited drop-down page turning experience in the manga list page.
