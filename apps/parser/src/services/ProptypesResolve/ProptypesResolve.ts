import path from 'path';
import toPath from 'lodash.topath';
import type * as TsMorph from 'ts-morph';
import { Project } from 'ts-morph';

import { getProptype } from './ProptypesResolve.utils';
import type * as Types from './ProptypesResolve.types';

//* 建立虛擬的 Props 及 SourceFile
const getVirtualSource: Types.PrivateGetVirtualSource = ({
  tsconfigDir,
  typeFile,
  typeName,
}) => {
  const virtualType = `Virtual${(Math.random() * 10000).toFixed()}Props`;
  const filePath = path.resolve(process.cwd(), typeFile);

  const importPath = path
    .basename(filePath)
    .replace(path.extname(filePath), '')
    .replace(/\.d$/, '');

  const project = new Project({
    tsConfigFilePath: path.resolve(
      process.cwd(),
      tsconfigDir,
      './tsconfig.json'
    ),
  });

  const source = project.createSourceFile(
    path.resolve(filePath, '../', `./${virtualType}.d.ts`),
    `
      import * as Ref from './${importPath}';

      export interface ${virtualType} extends Ref.${typeName} {}
    `
  );

  return [source, source.getInterface(virtualType)];
};

//* 取得目標 Object 的所有 Properties
const getObjectProperty: Types.PrivateGetObjectProperty = (
  type,
  propName,
  extendTypes = []
) => {
  const properties = extendTypes.reduce((result, extendType) => {
    extendType
      .getProperties()
      .forEach((property) => result.set(property.getName(), property));

    return result;
  }, new Map<string, TsMorph.Symbol>());

  type
    .getProperties()
    .forEach((property) => properties.set(property.getName(), property));

  return properties.get(propName) || null;
};

//* 依照指定路徑取得目標 Type
const getTypeByPath: Types.PrivateGetTypeByPath = (
  type,
  { extendTypes, info, paths, source }
) => {
  if (paths.length) {
    const [callSignature] = type?.getCallSignatures().reverse() || [];
    const target = paths.shift();

    if (callSignature) {
      switch (target) {
        case 'return':
          return getTypeByPath(callSignature.getReturnType(), {
            info: { propName: target, required: true },
            paths,
            source,
          });

        case 'params': {
          const index = paths.shift();
          const param =
            callSignature.getParameters()[Number.parseInt(index, 10)];

          return getTypeByPath(param.getTypeAtLocation(source), {
            info: { propName: index, required: !param.isOptional() },
            paths,
            source,
          });
        }
        default:
          return null;
      }
    }

    if (type?.isArray() && /^\d+$/.test(target)) {
      const element = type.getArrayElementType();
      const subinfo = { propName: target, required: true };

      return !element.isUnion()
        ? getTypeByPath(element, {
            info: subinfo,
            paths,
            source,
          })
        : element.getUnionTypes().reduce<Types.TypeResult>(
            (result, union) =>
              result ||
              getTypeByPath(union, {
                info: subinfo,
                paths: [...paths],
                source,
              }),
            null
          );
    }

    if (type?.isTuple() && /^\d+$/.test(target)) {
      const element = type.getTupleElements()[Number.parseInt(target, 10)];
      const subinfo = { propName: target, required: true };

      return !element.isUnion()
        ? getTypeByPath(element, { info: subinfo, paths, source })
        : element.getUnionTypes().reduce<Types.TypeResult>(
            (result, union) =>
              result ||
              getTypeByPath(union, {
                info: subinfo,
                paths: [...paths],
                source,
              }),
            null
          );
    }

    if (type?.getProperties().length && !type.isArray() && !type.isTuple()) {
      const symbol = getObjectProperty(type, target, extendTypes);
      const subinfo = { propName: target, required: !symbol.isOptional() };
      const element = symbol?.getTypeAtLocation(source);

      return !element?.isUnion()
        ? getTypeByPath(element, { info: subinfo, paths, source })
        : element.getUnionTypes().reduce<Types.TypeResult>(
            (result, union) =>
              result ||
              getTypeByPath(union, {
                info: subinfo,
                paths: [...paths],
                source,
              }),
            null
          );
    }

    return null;
  }

  return type ? [type, info] : null;
};

//* Service Methods
export const parse: Types.Parse = ({ propPath = '', ...options }) => {
  const [source, declaration] = getVirtualSource(options);

  const types = getTypeByPath(declaration.getType(), {
    extendTypes: declaration.getExtends().map((extend) => extend.getType()),
    info: { required: true },
    paths: toPath(propPath),
    source,
  });

  return (types && getProptype(...types, source)) || null;
};
