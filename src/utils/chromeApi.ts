export const getLocalStorage = <T>(key: string) =>
  new Promise<T>((resolve) => {
    chrome.storage.local.get(key, (data) => resolve(data[key]));
  });

export const setLocalStorage = <T>(key: string, value: T) =>
  new Promise<void>((resolve) => {
    chrome.storage.local.set({ [key]: value }, () => resolve());
  });

export const sendMessageToScrapboxIo = (message: string) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    tabs.forEach((tab) => {
      if (tab.url === undefined || tab.id === undefined) return;
      const url = new URL(tab.url);
      if (url.hostname === 'scrapbox.io') {
        chrome.tabs.sendMessage(tab.id, message);
      }
    });
  });
};