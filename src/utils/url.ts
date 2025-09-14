const PROTOCOL_REGEXP = /^https?:\/\//;

export const ensureProtocol = (url: string) =>
  PROTOCOL_REGEXP.test(url)
    ? url
    : url.startsWith('//')
      ? `${location.protocol}${url}`
      : `${location.protocol}//${url}`;
