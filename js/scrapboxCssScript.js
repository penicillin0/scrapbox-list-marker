'use strict';

import { getIndentCssRule, indentLineCss } from './cssGenerate.js';

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
        const css = getIndentCssRule(scrapboxIndentOption.value, i);
        document.styleSheets[0].insertRule(css);
      }
    }
  });
};

const insertIndentLineCSSRule = (isLining, indentColor) => {
  // delete existing rules
  const cssRules = document.styleSheets[0].cssRules;
  const cssRulesNum = cssRules.length;
  for (let i = cssRulesNum - 1; i >= 0; i--) {
    const cssRule = cssRules[i];
    const cssSelector = cssRule.selectorText;

    if (cssSelector === undefined) continue;

    if (
      cssSelector.match(
        /^\.app:not\(\.presentation\) .indent-mark .char-index:not\(:nth-last-child\(1\)\):not\(:nth-last-child\(2\)\)*/
      )
    ) {
      document.styleSheets[0].deleteRule(i);
    }
  }

  // insert new rules
  if (isLining) {
    indentLineCss.map((css) => {
      if (css.includes('#dcdcdc')) {
        css = css.replace('#dcdcdc', indentColor);
      }
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

const liningAttachment = () => {
  chrome.storage.local.get('scrapboxIndentLining', (result) => {
    const isLining = result.scrapboxIndentLining;

    chrome.storage.local.get('scrapboxIndentLineColor', (result) => {
      const scrapboxIndentLineColor =
        result.scrapboxIndentLineColor || '#dcdcdc';
      insertIndentLineCSSRule(isLining, scrapboxIndentLineColor);
    });
  });
};

// update
chrome.runtime.onMessage.addListener((request) => {
  if (request === 'scrapbox_list_maker') {
    makerAttachment();
  }
  if (
    request === 'scrapbox_indent_lining' ||
    request === 'scrapbox_indent_lining_color'
  ) {
    liningAttachment();
  }
});

// initialize
makerAttachment();
liningAttachment();
