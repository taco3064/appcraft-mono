const { DefinePlugin } = require('webpack');
const { composePlugins, withNx } = require('@nrwl/webpack');

const getSecretEnvironments = require('../../tools/generators/secret-environments');
const webpackBase = require('../../tools/generators/webpack.base');

// Nx plugins for webpack.
module.exports = composePlugins(
  withNx(),
  getSecretEnvironments('JWT_SECRET', 'MONGODB_CONNECTION').then(
    ({ JWT_SECRET, MONGODB_CONNECTION }) =>
      ({ plugins, resolve, ...config }, context) => {
        const base = webpackBase(context.configuration, __dirname);

        return {
          ...config,
          plugins: [
            ...plugins,
            ...base.plugins,
            new DefinePlugin({
              '__WEBPACK_DEFINE__.JWT_SECRET': JSON.stringify(JWT_SECRET),
              '__WEBPACK_DEFINE__.MONGODB_CONNECTION':
                JSON.stringify(MONGODB_CONNECTION),
            }),
          ],
          resolve: {
            ...resolve,
            alias: {
              ...resolve.alias,
              ...base.resolve.alias,
            },
          },
        };
      }
  )
);
