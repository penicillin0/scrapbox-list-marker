export const getLocalStorage = <T>(key: string) =>
  new Promise<T>((resolve) => {
    chrome.storage.local.get(key, (data) => resolve(data[key]));
  });

export const setLocalStorage = <T>(key: string, value: T) =>
  new Promise<void>((resolve) => {
    chrome.storage.local.set({ [key]: value }, () => resolve());
  });
