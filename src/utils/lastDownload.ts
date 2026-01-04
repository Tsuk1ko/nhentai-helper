import { once } from 'es-toolkit';
import localforage from 'localforage';
import { IDB_NAME } from '@/const';

const store = localforage.createInstance({
  name: IDB_NAME,
  storeName: 'last_download',
});

const getKey = once(() => {
  const url = new URL(location.href);
  return `${url.origin}${url.pathname.replace(/\/+$/, '')}`;
});
