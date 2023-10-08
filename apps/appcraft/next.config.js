const fs = require('fs');
const path = require('path');
const { DefinePlugin } = require('webpack');
const { withNx } = require('@nrwl/next/plugins/with-nx');
const MuiIcons = require('@mui/icons-material');

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
    {
      source: '/app/:pathname*',
      destination: '/app',
    },
  ],
  webpack: ({ module, plugins, resolve, ...config }, context) => {
    const base = webpackBase(context.buildId, __dirname);

    //* 取得 App 支援的 Languages
    const languages = fs
      .readdirSync(path.resolve(__dirname, './src/assets/locales'))
      .filter((fileName) => !/^index\.(t|j)s$/.test(fileName));

    return {
      ...config,
      module: {
        ...module,
        rules: [
          ...module.rules,
          {
            test: /\.svg$/,
            use: ['@svgr/webpack'],
          },
        ],
      },
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

          '__WEBPACK_DEFINE__.MUI_ICONS': JSON.stringify(
            Object.keys(MuiIcons).reduce((result, name) => {
              if (name.endsWith('Outlined')) {
                result.push(
                  name
                    .replace(/([A-Z])/g, '_$1')
                    .toLowerCase()
                    .replace(/^_/, '')
                );
              }

              return result;
            }, [])
          ),
          '__WEBPACK_DEFINE__.STATE_TYPE_FILE': JSON.stringify(
            process.env.SERVICE_PROXY === 'http://127.0.0.1:80'
              ? './libs/types/src/widgets/state.types.ts'
              : './node_modules/@appcraft/types/src/widgets/state.types.d.ts'
          ),
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
