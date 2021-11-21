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

const indentColorCSS = [
  `.indent-mark .char-index{
      --scrapbox-indent-maker-opacity: 0.2;
      --scrapbox-indent-maker-yellow:     rgba(255,255,64, var(--scrapbox-indent-maker-opacity)); 
      --scrapbox-indent-maker-green:  rgba(127,255,127, var(--scrapbox-indent-maker-opacity));
      --scrapbox-indent-maker-red:  rgba(255,127,255, var(--scrapbox-indent-maker-opacity));
      --scrapbox-indent-maker-blue:   rgba(79,236,236, var(--scrapbox-indent-maker-opacity));
  }`,
  `.app:not(.presentation) .indent-mark .char-index:nth-child(4n+1) { background-color: var(--scrapbox-indent-maker-yellow) }`,
  `.app:not(.presentation) .indent-mark .char-index:nth-child(4n+2) { background-color: var(--scrapbox-indent-maker-green) }`,
  `.app:not(.presentation) .indent-mark .char-index:nth-child(4n+3) { background-color: var(--scrapbox-indent-maker-red) }`,
  `.app:not(.presentation) .indent-mark .char-index:nth-child(4n) { background-color: var(--scrapbox-indent-maker-blue) }`,
  `.app:not(.presentation) .indent-mark .char-index:nth-last-child(2) { background-color: transparent !important; }`,
  `.app:not(.presentation) .indent-mark .char-index:nth-last-child(1) { background-color: transparent !important; }`,
];

const insertIndentColorCSSRule = (isColoring) => {
  // delete existing rules
  const cssRules = document.styleSheets[0].cssRules;
  const cssRulesNum = cssRules.length;
  for (let i = cssRulesNum - 1; i >= 0; i--) {
    const cssRule = cssRules[i];
    const cssSelector = cssRule.selectorText;

    if (cssSelector === undefined) continue;

    if (
      cssSelector.match(
        /^\.app:not\(.presentation\) \.indent-mark \.char-index:nth-child.*/
      )
    ) {
      document.styleSheets[0].deleteRule(i);
    }
  }

  // insert new rules
  if (isColoring) {
    indentColorCSS.map((css) => {
      document.styleSheets[0].insertRule(css);
    });
  }
};

const makerAttachment = () => {
  chrome.storage.local.get('scrapboxIndentOption', (result) => {
    const scrapboxIndentOptions = result.scrapboxIndentOption;
    insertIndentCSSRule(scrapboxIndentOptions);
  });
};

const coloringAttachment = () => {
  chrome.storage.local.get('scrapboxIndentColoring', (result) => {
    const isColoring = result.scrapboxIndentColoring;
    insertIndentColorCSSRule(isColoring);
  });
};

// update
chrome.runtime.onMessage.addListener((request) => {
  if (request === 'scrapbox_list_maker') {
    makerAttachment();
  }
  if (request === 'scrapbox_indent_coloring') {
    coloringAttachment();
  }
});

// initialize
makerAttachment();
coloringAttachment();
