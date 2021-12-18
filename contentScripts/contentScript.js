(async () => {
  const src = chrome.runtime.getURL('contentScripts/scrapboxCssScript.js');
  const contentScript = await import(src);
  contentScript.main();
})();
