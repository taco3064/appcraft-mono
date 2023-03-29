const { composePlugins, withNx } = require('@nrwl/webpack');
const webpackBase = require('../../tools/generators/webpack.base');

// Nx plugins for webpack.
module.exports = composePlugins(
  withNx(),
  ({ plugins, resolve, ...config }, context) => {
    const base = webpackBase(context.configuration, __dirname);

    return {
      ...config,
      plugins: [...plugins, ...base.plugins],
      resolve: {
        ...resolve,
        alias: {
          ...resolve.alias,
          ...base.resolve.alias,
        },
      },
    };
  }
);
