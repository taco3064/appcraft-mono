const { composePlugins, withNx } = require('@nrwl/webpack');
const webpackBase = require('../../tools/generators/webpack.base');

// Nx plugins for webpack.
module.exports = composePlugins(withNx(), ({ resolve, ...config }, context) => {
  const {
    resolve: { alias },
  } = webpackBase(__dirname, context);

  return {
    ...config,
    resolve: {
      ...resolve,
      alias: {
        ...resolve.alias,
        ...alias,
      },
    },
  };
});
