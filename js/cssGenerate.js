export const getIndentCssRule = (marker, indentNumber) => {
  switch (marker) {
    case '●':
      return `.c-${indentNumber} + .dot {height: .4em !important;width: .4em !important;border-color: rgba(0,0,0,0.65) !important;border: solid .1em rgba(0,0,0,0.65) !important;background-color: rgba(0,0,0,0.65) !important;}`;
    case '○':
      return `.c-${indentNumber} + .dot {height: .4em !important;width: .4em !important;border-color: black !important;border: solid .1em rgba(0,0,0,0.65) !important;background-color: rgb(255,255,255) !important;}`;
    case '■':
      return `.c-${indentNumber} + .dot {height: .4em !important;width: .4em !important;border-radius: 25% !important;background-color: rgba(0,0,0,0.65) !important;}`;
    case '□':
      return `.c-${indentNumber} + .dot {height: .4em !important; width: .4em !important;border-radius: 25% !important; border: solid .1em rgba(0,0,0,0.65) !important;background-color: rgb(255,255,255) !important; }`;
    default:
      break;
  }
};

export const indentLineCss = [
  `.app:not(.presentation) .indent-mark .char-index:not(:nth-last-child(1)):not(:nth-last-child(2)) { position: relative; }`,
  `.app:not(.presentation) .indent-mark .char-index:not(:nth-last-child(1)):not(:nth-last-child(2))::before {
      content: " ";
      position: absolute;
      left: 43%;
      margin: -4px 0;
      border-left: 2px solid #dcdcdc;
    }`,
];
