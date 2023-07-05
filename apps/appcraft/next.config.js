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
      destination: `${process.env.SERVICE_PROXY}/:path*`,
    },
  ],
  webpack: ({ plugins, resolve, ...config }, context) => {
    const base = webpackBase(context.buildId, __dirname);

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
          ...base.resolve.alias,
        },
      },
      plugins: [
        ...plugins,
        ...base.plugins,
        new DefinePlugin({
          '__WEBPACK_DEFINE__.LANGUAGES': JSON.stringify(languages),
          '__WEBPACK_DEFINE__.TODO_TYPE_FILE': JSON.stringify(
            process.env.SERVICE_PROXY === 'http://127.0.0.1:80'
              ? './libs/types/src/widgets/todo.types.ts'
              : './node_modules/@appcraft/types/src/widgets/todo.types.d.ts'
          ),
        }),
      ],
    };
  },
};

module.exports = withNx(nextConfig);
