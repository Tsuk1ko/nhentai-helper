const defaultClassName = {
  greyButton: 'btn btn-secondary',
};

type ClassNameRule = typeof defaultClassName;

const siteMap: Record<string, Partial<ClassNameRule>> = {
  'nhentai.xxx': {
    greyButton: 'mbtn grey',
  },
};

export const className: ClassNameRule = { ...defaultClassName, ...siteMap[location.hostname] };
