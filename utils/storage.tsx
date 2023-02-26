import { SessionData } from "@/interfaces/storage";

export const isBrowser = typeof window !== "undefined";

function isEmpty(storage: Storage) {
  return !storage;
}

export function getValueFrom(storage: Storage, key: string) {
  if (isEmpty(storage)) {
    return;
  }
  const rawData = storage.getItem(key);

  if (!rawData) {
    return;
  }
  return JSON.parse(rawData);
}

export function setValueTo(storage: Storage, key: string, data: SessionData) {
  if (isEmpty(storage)) {
    return;
  }
  return storage.setItem(key, JSON.stringify(data));
}

export const getFromLocal = (key: string) => {
  if (isBrowser) {
    const localStorage = window.localStorage;
    return getValueFrom(localStorage, key);
  }
};

export const setToLocal = (key: string, data: SessionData) => {
  if (isBrowser) {
    const localStorage = window.localStorage;
    return setValueTo(localStorage, key, data);
  }
};
