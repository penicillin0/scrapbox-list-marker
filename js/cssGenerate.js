export const getIndentCssRule = (
  marker,
  indentNumber,
  markerColor,
  coloring
) => {
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
