const fs = require('fs');
const path = require('path');

module.exports = (dirname, context) => {
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
    resolve: {
      alias: {
        ...libAlias,
        ...dirAlias,
      },
    },
  };
};
