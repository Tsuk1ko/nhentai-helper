const defaultSelector = {
  // list
  menuLeft: 'ul.menu.left',
  gallery: '.gallery',
  galleryHref: '.gallery a',
  galleryList: '#content',
  galleryCover: 'a.cover',
  galleryCaption: '.caption',
  pjaxTrigger: '.pagination a, .sort a',
  pjaxTarget: '#content',
  pjaxRemoveParam: '.pagination a',
  paginationPrevious: '.pagination .previous',
  paginationNext: '.pagination .next',
  // gallery
  showAllImagesButton: '#show-all-images-button',
  thumbnailContainer: '#thumbnail-container',
  thumbnailContainerImage: '#thumbnail-container img',
  thumbnailHref: 'a.gallerythumb',
  englishTitle: '#info h1',
  japaneseTitle: '#info h2',
  tag: (text: string) => `#tags .tag-container:contains(${text}) .tag`,
  tagName: '.name',
  tagCount: '.count',
  pagesTag: '#tags .tag-container:contains(Pages) .name',
  uploadDateTag: '#tags .tag-container:contains(Uploaded) time',
  infoButtons: '#info > .buttons',
  // view
  mediaImage: '#image-container img',
  pageContainer: '#page-container',
};

type SelectorRule = typeof defaultSelector;

const siteMap: Record<string, Partial<SelectorRule>> = {
  'nhentai.xxx': {
    // list
    menuLeft: 'ul.hd_left',
    gallery: '.gallery_item',
    galleryHref: '.gallery_item a',
    galleryList: '.main_wrap',
    galleryCover: 'a',
    pjaxTrigger: '.pagination a, .sort_links a',
    pjaxTarget: '.main_wrap',
    paginationPrevious: '.pagination a:contains(Previous)',
    paginationNext: '.pagination a:contains(Next)',
    // gallery
    showAllImagesButton: '#show_all',
    thumbnailContainer: '.outer_thumbs',
    thumbnailContainerImage: '.outer_thumbs img',
    thumbnailHref: '.gt_th > a',
    englishTitle: '.info h1',
    japaneseTitle: '.info h2',
    tag: (text: string) => `li.tags:contains(${text}) .tag_btn`,
    tagName: '.tag_name',
    tagCount: '.tag_count',
    pagesTag: '.tag_name.pages',
    uploadDateTag: '.tags.uploaded',
    infoButtons: '.info > .g_buttons',
    // view
    mediaImage: '#fimg',
    pageContainer: '.reader_outer',
  },
};

export const selector: SelectorRule = { ...defaultSelector, ...siteMap[location.hostname] };
