export const getIndentCssRule = (marker, indentNumber, markerColor) => {
  const insideColor = decideInsideColor(markerColor);
  switch (marker) {
    case '●':
      return `.c-${indentNumber} + .dot {height: .4em !important;width: .4em !important; border-color: ${markerColor} !important;border: solid .1em ${markerColor} !important; background-color: ${markerColor} !important;}`;
    case '○':
      return `.c-${indentNumber} + .dot {height: .4em !important;width: .4em !important; border-color: black !important; border: solid .1em ${markerColor} !important; background-color: ${insideColor} !important;}`;
    case '■':
      return `.c-${indentNumber} + .dot {height: .4em !important;width: .4em !important; border-radius: 0% !important; background-color: ${markerColor} !important;}`;
    case '□':
      return `.c-${indentNumber} + .dot {height: .4em !important; width: .4em !important; border-radius: 0% !important; border: solid .1em ${markerColor} !important; background-color: ${insideColor} !important; }`;
    default:
      break;
  }
};

const makeRGB = (color) => {
  if (color.includes('rgba')) {
    const [red, green, blue, _] = color
      .substring(color.indexOf('(') + 1, color.lastIndexOf(')'))
      .split(/,\s*/);
    return [Number(red), Number(green), Number(blue)];
  } else if (color.includes('rgb')) {
    const [red, green, blue] = color
      .substring(color.indexOf('(') + 1, color.lastIndexOf(')'))
      .split(/,\s*/);
    return [Number(red), Number(green), Number(blue)];
  } else {
    // hex to red, green, blue
    const [red, green, blue] = [
      parseInt(color.substring(1, 3), 16),
      parseInt(color.substring(3, 5), 16),
      parseInt(color.substring(5, 7), 16),
    ];
    return [red, green, blue];
  }
};

const decideInsideColor = (color) => {
  const [red, green, blue] = makeRGB(color);
  const insideColor =
    red * 0.299 + green * 0.587 + blue * 0.114 > 186 ? '#111111' : '#eeeeee';
  return insideColor;
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
