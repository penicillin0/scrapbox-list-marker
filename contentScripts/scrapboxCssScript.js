'use strict';

import { consoleTest } from './cssRuleGenerate.js';

export function main() {
  const indentCSSRule = new Map([
    [
      '●',
      {
        before: ' .c-',
        after:
          ' + .dot {height: .4em !important;width: .4em !important;border-color: rgba(0,0,0,0.65) !important;border: solid .1em rgba(0,0,0,0.65) !important;background-color: rgba(0,0,0,0.65) !important;}',
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
      const indentNum = Number(
        scrapboxIndentOption.label.replace(/[^0-9]/g, '')
      );

      for (let i = 0; i < 20; i++) {
        if (i % 4 === indentNum - 1) {
          const before = indentCSSRule.get(scrapboxIndentOption.value).before;
          const after = indentCSSRule.get(scrapboxIndentOption.value).after;
          document.styleSheets[0].insertRule(before + String(i) + after);
        }
      }
    });
  };

  const indentLineCSS = [
    `.app:not(.presentation) .indent-mark .char-index:not(:nth-last-child(1)):not(:nth-last-child(2)) { position: relative; }`,
    `.app:not(.presentation) .indent-mark .char-index:not(:nth-last-child(1)):not(:nth-last-child(2))::before {
      content: " ";
      position: absolute;
      left: 43%;
      margin: -4px 0;
      border-left: 2px solid #dcdcdc;
    }`,
  ];

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
      indentLineCSS.map((css) => {
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
        consoleTest();
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
}
