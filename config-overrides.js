/* config-overrides.js */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  webpack: function (config, env) {
    const copyPlugin = new CopyPlugin({
      patterns: [
        { from: 'js/scrapboxCssScript.js', to: 'contentScriptDist.js' },
      ],
    });
    config.plugins.push(copyPlugin);
    return config;
  },
};
