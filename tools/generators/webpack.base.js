const fs = require('fs');
const path = require('path');
const { DefinePlugin } = require('webpack');

module.exports = (dirname, context) => {
  const basename = path.basename(dirname);

  //* 取得 App 支援的 Languages
  const languages = fs
    .readdirSync(path.resolve(dirname, './src/assets/locales'))
    .filter((fileName) => !/^index\.(t|j)s$/.test(fileName));

  console.log(process.cwd());

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
        '__WEBPACK_DEFINE__.LANGUAGES': JSON.stringify(languages),
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
