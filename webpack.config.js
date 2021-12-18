module.exports = {
  entry: `./js/scrapboxCssScript.js`,
  mode: 'production',

  output: {
    path: `${__dirname}/build`,
    filename: 'contentScriptDist.js',
  },
};
