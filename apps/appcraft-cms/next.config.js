const { merge } = require('webpack-merge');
const { withNx } = require('@nrwl/next/plugins/with-nx');

const webpackGenerator = require('../../tools/generators/webpack.base');
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
      destination: `http://localhost:${process.env.PROXY_SERVER_PORT}/:path*`,
    },
  ],
  webpack: (config, context) =>
    merge(config, webpackGenerator(__dirname, context)),
};

module.exports = withNx(nextConfig);
