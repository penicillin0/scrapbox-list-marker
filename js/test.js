var stylesheet = document.styleSheets[0];
console.log(stylesheet);
console.log(stylesheet.cssRules[1384]);
console.log(stylesheet.cssRules[1384].style.backgroundColor);
stylesheet.cssRules[1384].style.backgroundColor = "rgb(3, 255, 255)";
