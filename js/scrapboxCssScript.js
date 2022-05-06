'use strict';

const getIndentCssRule = (marker, indentNumber, markerColor, coloring) => {
  let shapeCss = `.c-${indentNumber} + .dot { height: .4em !important; width: .4em !important;`;
  let colorCss = '';
  switch (marker) {
    case '●':
      colorCss = coloring
        ? `border-color: ${markerColor} !important;border: solid .1em ${markerColor} !important; background-color: ${markerColor} !important;`
        : '';
      break;
    case '○':
      colorCss = coloring
        ? `border-color: black !important; border: solid .1em ${markerColor} !important; background-color: rgba(0,0,0,0) !important;`
        : `border: solid .1em var(--page-text-color, #555) !important; background-color: rgba(0,0,0,0) !important;`;
      break;
    case '■':
      shapeCss += ` border-radius: 0% !important;`;
      colorCss = coloring ? `background-color: ${markerColor} !important;` : '';
      break;
    case '□':
      shapeCss += ` border-radius: 0% !important;`;
      colorCss = coloring
        ? `border: solid .1em ${markerColor} !important; background-color: rgba(0,0,0,0) !important;`
        : `border: solid .1em var(--page-text-color, #555) !important; background-color: rgba(0,0,0,0) !important;`;
      break;
    default:
      break;
  }
  return `${shapeCss} ${colorCss} }`;
};

const indentLineCss = [
  `.app:not(.presentation) .indent-mark .char-index:not(:nth-last-child(1)):not(:nth-last-child(2)) { position: relative; }`,
  `.app:not(.presentation) .indent-mark .char-index:not(:nth-last-child(1)):not(:nth-last-child(2))::before {
      content: " ";
      position: absolute;
      left: 43%;
      margin: -4px 0;
      border-left: 2px solid #dcdcdc;
    }`,
];

const insertIndentCSSRule = (
  scrapboxIndentOptions,
  scrapboxMarkerColor,
  scrapboxMarkerColoring
) => {
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
        const css = getIndentCssRule(
          scrapboxIndentOption.value,
          i,
          scrapboxMarkerColor,
          scrapboxMarkerColoring
        );
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
  chrome.storage.local.get(
    ['scrapboxIndentOption', 'scrapboxMarkerColor', 'scrapboxMarkerColoring'],
    (result) => {
      const scrapboxIndentOptions = result.scrapboxIndentOption;
      const scrapboxMarkerColor = result.scrapboxMarkerColor;
      const scrapboxMarkerColoring = result.scrapboxMarkerColoring;
      insertIndentCSSRule(
        scrapboxIndentOptions,
        scrapboxMarkerColor,
        scrapboxMarkerColoring
      );
    }
  );
};

const liningAttachment = () => {
  chrome.storage.local.get(
    ['scrapboxIndentLining', 'scrapboxIndentLineColor'],
    (result) => {
      const isLining = result.scrapboxIndentLining;
      const scrapboxIndentLineColor =
        result.scrapboxIndentLineColor || '#dcdcdc';

      insertIndentLineCSSRule(isLining, scrapboxIndentLineColor);
    }
  );
};

// update
chrome.storage.onChanged.addListener((changes) => {
  const changedStorageKeys = Object.keys(changes);

  for (const key of changedStorageKeys) {
    switch (key) {
      case 'scrapboxIndentOption':
        makerAttachment();
        break;
      case 'scrapboxIndentLining':
        liningAttachment();
        break;
      case 'scrapboxIndentLineColor':
        liningAttachment();
        break;
      case 'scrapboxMarkerColor':
        makerAttachment();
        break;
      case 'scrapboxMarkerColoring':
        makerAttachment();
        break;
      default:
        break;
    }
  }
});

// initialize
makerAttachment();
liningAttachment();
