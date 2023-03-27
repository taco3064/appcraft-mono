const fs = require('fs');
const path = require('path');
const { DefinePlugin } = require('webpack');
const { withNx } = require('@nrwl/next/plugins/with-nx');

const webpackBase = require('../../tools/generators/webpack.base');
const isProduction = process.env.NODE_ENV === 'production';

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  basePath: isProduction ? '/demo' : '',
  pageExtensions: ['tsx'],
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  rewrites: async () => [
    {
      source: '/api/:path*',
      destination: `http://localhost:${process.env.PORT_PROXY}/:path*`,
    },
  ],
  webpack: ({ plugins, resolve, ...config }, context) => {
    const {
      resolve: { alias },
    } = webpackBase(__dirname, context);

    //* 取得 App 支援的 Languages
    const languages = fs
      .readdirSync(path.resolve(__dirname, './src/assets/locales'))
      .filter((fileName) => !/^index\.(t|j)s$/.test(fileName));

    return {
      ...config,
      resolve: {
        ...resolve,
        alias: {
          ...resolve.alias,
          ...alias,
        },
      },
      plugins: [
        ...plugins,
        new DefinePlugin({
          '__WEBPACK_DEFINE__.LANGUAGES': JSON.stringify(languages),
        }),
      ],
    };
  },
};

module.exports = withNx(nextConfig);
