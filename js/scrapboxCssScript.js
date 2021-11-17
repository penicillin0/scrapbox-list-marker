'use strict';

const indentCSSRule = new Map([
  [
    '●',
    {
      before: ' .c-',
      after:
        ' + .dot {height: .4em !important;width: .4em !important;border-color: black !important;border: solid .1em rgba(0,0,0,0.65) !important;background-color: rgba(0,0,0,0.65) !important;}',
    },
  ],
  [
    '○',
    {
      before: ' .c-',
      after:
        ' + .dot {height: .4em !important;width: .4em !important;border-color: black !important;border: solid .1em rgba(0,0,0,0.65) !important;background-color: rgb(255,255,255) !important;}',
    },
  ],
  [
    '■',
    {
      before: ' .c-',
      after:
        ' + .dot {height: .4em !important;width: .4em !important;border-radius: 25% !important;background-color: rgba(0,0,0,0.65) !important;}',
    },
  ],
  [
    '□',
    {
      before: ' .c-',
      after:
        ' + .dot {height: .4em !important; width: .4em !important;border-radius: 25% !important; border: solid .1em rgba(0,0,0,0.65) !important;background-color: rgb(255,255,255) !important; }',
    },
  ],
]);

const insertIndentCSSRule = (scrapboxIndentOptions) => {
  // delete existing rules
  const cssRules = document.styleSheets[0].cssRules;
  const cssRulesNum = cssRules.length;
  for (let i = cssRulesNum - 1; i >= 0; i--) {
    const cssRule = cssRules[i];
    const cssSelector = cssRule.selectorText;

    if (cssSelector === undefined) continue;

    if (cssSelector.match(/^(\.(c-\d+) \+ \.dot)$/)) {
      document.styleSheets[0].deleteRule(i);
    }
  }

  // insert new rules
  scrapboxIndentOptions.map((scrapboxIndentOption) => {
    const indentNum = Number(scrapboxIndentOption.label.replace(/[^0-9]/g, ''));

    for (let i = 0; i < 20; i++) {
      if (i % 4 === indentNum - 1) {
        const before = indentCSSRule.get(scrapboxIndentOption.value).before;
        const after = indentCSSRule.get(scrapboxIndentOption.value).after;
        document.styleSheets[0].insertRule(before + String(i) + after);
      }
    }
  });
};

const storageAttachment = () => {
  chrome.storage.local.get('scrapboxIndentOption', (result) => {
    const scrapboxIndentOptions = result.scrapboxIndentOption;
    insertIndentCSSRule(scrapboxIndentOptions);
  });
};

// update
chrome.runtime.onMessage.addListener((request) => {
  if (request === 'scrapbox_list_maker') {
    storageAttachment();
  }
});

// initialize
storageAttachment();
