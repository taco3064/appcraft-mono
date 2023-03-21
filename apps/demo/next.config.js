const { withNx } = require('@nrwl/next/plugins/with-nx');
const { merge } = require('webpack-merge');
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
      source: '/api/parser/:path*',
      destination: 'http://localhost:3068/:path*',
    },
  ],
  webpack: (config, context) =>
    merge(config, webpackGenerator(__dirname, context)),
};

module.exports = withNx(nextConfig);
