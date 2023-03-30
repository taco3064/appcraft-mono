const { DefinePlugin } = require('webpack');
const { composePlugins, withNx } = require('@nrwl/webpack');

const getSecretEnvironments = require('../../tools/generators/secret-environments');
const webpackBase = require('../../tools/generators/webpack.base');

// Nx plugins for webpack.
module.exports = composePlugins(
  withNx(),
  getSecretEnvironments(
    'GOOGLE_CLIENT_ID',
    'GOOGLE_CLIENT_SECRET',
    'JWT_SECRET'
  ).then(
    ({ GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, JWT_SECRET }) =>
      ({ plugins, resolve, ...config }, context) => {
        const base = webpackBase(context.configuration, __dirname);

        return {
          ...config,
          plugins: [
            ...plugins,
            ...base.plugins,
            new DefinePlugin({
              '__WEBPACK_DEFINE__.GOOGLE_CLIENT_ID':
                JSON.stringify(GOOGLE_CLIENT_ID),
              '__WEBPACK_DEFINE__.GOOGLE_CLIENT_SECRET':
                JSON.stringify(GOOGLE_CLIENT_SECRET),
              '__WEBPACK_DEFINE__.JWT_SECRET': JSON.stringify(JWT_SECRET),
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
