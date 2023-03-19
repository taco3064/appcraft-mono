import path from 'path';
import toPath from 'lodash.topath';
import type * as TsMorph from 'ts-morph';
import { Project } from 'ts-morph';

import type * as Types from './ProptypesResolve.types';

//* 取得目標 Type 對應的 PropTypes
// const getProptype: Types.PrivateGetProptype = (() => {
//   //* 定義 PropTypes 的檢查方式及回傳的 Config 內容 (要注意先後順序)
//   const generators: Types.Generators = [
//     (type, info) =>
//       type.getText() === 'React.ReactNode' && { ...info, type: 'node' },

//     (type, info) => type.isBoolean() && { ...info, type: 'bool' },
//     (type, info) => type.isNumber() && { ...info, type: 'number' },
//     (type, info) => type.isString() && { ...info, type: 'string' },
//   ];

//   return (...args) =>
//     generators.reduce(
//       (result, generator) => result || generator(...args),
//       undefined
//     );
// })();

//* 建立虛擬的 Props 及 SourceFile
const getVirtualSource: Types.PrivateGetVirtualSource = ({
  tsconfigDir,
  tsFile,
  propsType,
}) => {
  const virtualType = `Virtual${(Math.random() * 10000).toFixed()}Props`;
  const baseFile = path.resolve(process.cwd(), tsFile);

  const importFile = path
    .basename(baseFile)
    .replace(path.extname(baseFile), '')
    .replace(/\.d$/, '');

  const project = new Project({
    tsConfigFilePath: path.resolve(
      process.cwd(),
      tsconfigDir,
      './tsconfig.json'
    ),
  });

  const source = project.createSourceFile(
    path.resolve(baseFile, '../', `./${virtualType}.d.ts`),
    `
      import * as Ref from './${importFile}';

      export interface ${virtualType} extends Ref.${propsType} {}
    `
  );

  return [source, source.getInterface(virtualType)];
};

const resolveByPaths: Types.PrivateResolveByPaths = (
  properties,
  { paths, required, source, superior, superiorType }
) => {
  if (paths.length) {
    const target = paths.shift();
  }

  // switch (superiorType) {
  //   case 'object':
  //     return {
  //       superiorType,
  //       superior,
  //       proptypes: {
  //         //! name: 未定
  //         required,
  //         type: 'exact',
  //         options: properties.reduce<Record<string, Types.PropTypesDef>>(
  //           (result, property) => {
  //             const name = property.getName();

  //             const proptype = getProptype(property.getTypeAtLocation(source), {
  //               name,
  //               required: !property.isOptional(),
  //             });

  //             return {
  //               ...result,
  //               ...(proptype && { [name]: proptype }),
  //             };
  //           },
  //           {}
  //         ),
  //       },
  //     };

  //   case 'array': {
  //     break;
  //   }
  //   default:
  // }

  return null;
};

//* Service Methods
export const parse: Types.Parse = ({ superior = '', ...options }) => {
  const [source, declaration] = getVirtualSource(options);

  const properties = declaration
    .getExtends()
    .reduce<Map<string, TsMorph.Symbol>>((result, extend) => {
      extend
        .getType()
        .getProperties()
        .forEach((property) => result.set(property.getName(), property));

      return result;
    }, new Map());

  return resolveByPaths(Array.from(properties.values()), {
    paths: toPath(superior),
    required: true,
    source,
    superior,
    superiorType: 'object',
  });
};
