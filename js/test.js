var stylesheet = document.styleSheets[0];

stylesheet.cssRules[1384].style.backgroundColor = "rgb(230, 255, 255)";
const indentCSSRule = new Map([
  [
    "1",
    {
      before: " .c-",
      after:
        " + .dot {height: .4em !important;width: .4em !important;border-color: black !important;border: solid .1em rgba(0,0,0,0.65) !important;background-color: rgb(255,255,255) !important;}",
    },
  ],
  [
    "2",
    {
      before: " .c-",
      after:
        " + .dot {height: .4em !important;width: .4em !important;border-radius: 25% !important;background-color: rgba(0,0,0,0.65) !important;}",
    },
  ],
  [
    "3",
    {
      before: " .c-",
      after:
        " + .dot {height: .4em !important; width: .4em !important;border-radius: 25% !important; border: solid .1em rgba(0,0,0,0.65) !important;background-color: rgb(255,255,255) !important; }",
    },
  ],
]);

const insertIndentCSSRule = (indentNum) => {
  const modNum = String(indentNum % 4);
  if (modNum === "0") return;

  const before = indentCSSRule.get(modNum).before;
  const after = indentCSSRule.get(modNum).after;
  stylesheet.insertRule(before + indentNum + after);
};

for (let i = 1; i < 20; i++) {
  insertIndentCSSRule(i);
}
