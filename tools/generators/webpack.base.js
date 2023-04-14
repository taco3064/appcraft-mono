const fs = require('fs');
const path = require('path');
const { DefinePlugin } = require('webpack');
const { version } = require('../../package.json');

module.exports = (environment, dirname) => {
  const basename = path.basename(dirname);

  //* 取得現有 Libs
  const libAlias = fs.readdirSync(path.resolve(process.cwd(), './libs')).reduce(
    (result, libDir) => ({
      ...result,
      [`@appcraft/${libDir}`]: path.resolve(
        process.cwd(),
        `./libs/${libDir}/src`
      ),
    }),
    {}
  );

  //* 取得 App ./src 下的所有資料夾
  const dirAlias = fs.readdirSync(path.resolve(dirname, './src')).reduce(
    (result, srcDir) => ({
      ...result,
      [`~${basename}/${srcDir}`]: path.resolve(dirname, `./src/${srcDir}`),
    }),
    {}
  );

  return {
    plugins: [
      new DefinePlugin({
        '__WEBPACK_DEFINE__.ENV': JSON.stringify(environment),
        '__WEBPACK_DEFINE__.VERSION': JSON.stringify(version),
      }),
    ],
    resolve: {
      alias: {
        ...libAlias,
        ...dirAlias,
      },
    },
  };
};
