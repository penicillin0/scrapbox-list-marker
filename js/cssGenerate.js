export const getIndentCssRule = (marker, indentNumber, markerColor) => {
  switch (marker) {
    case '●':
      return `.c-${indentNumber} + .dot {height: .4em !important;width: .4em !important; border-color: ${markerColor} !important;border: solid .1em ${markerColor} !important; background-color: ${markerColor} !important;}`;
    case '○':
      return `.c-${indentNumber} + .dot {height: .4em !important;width: .4em !important; border-color: black !important; border: solid .1em ${markerColor} !important; background-color: rgba(255,255,255, 0.4) !important;}`;
    case '■':
      return `.c-${indentNumber} + .dot {height: .4em !important;width: .4em !important; border-radius: 0% !important; background-color: ${markerColor} !important;}`;
    case '□':
      return `.c-${indentNumber} + .dot {height: .4em !important; width: .4em !important; border-radius: 0% !important; border: solid .1em ${markerColor} !important; background-color: rgba(255,255,255, 0.4) !important; }`;
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
