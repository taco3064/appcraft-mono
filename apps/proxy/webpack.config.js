const { composePlugins, withNx } = require('@nrwl/webpack');
const { merge } = require('webpack-merge');

const webpackGenerator = require('../../tools/generators/webpack.backend.base');

// Nx plugins for webpack.
module.exports = composePlugins(withNx(), (config, context) => {
  // Update the webpack config as needed here.
  // e.g. `config.plugins.push(new MyPlugin())`
  return merge(config, webpackGenerator(__dirname, context));
});
