import path from 'path';
import _toPath from 'lodash.topath';
import { Project } from 'ts-morph';
import { debounce } from 'throttle-debounce';
import type * as TsMorph from 'ts-morph';

import { getProptype } from './types-resolve.utils';
import type * as Types from './types-resolve.types';

const queues = new Map<
  string,
  {
    virtual: Types.VirtualSource;
    destroy: () => void;
  }
>();

//* 建立虛擬的 Props 及 SourceFile
const getVirtualSource: Types.PrivateGetVirtualSource = ({
  typeFile,
  typeName,
}) => {
  const filePath = path.resolve(process.cwd(), typeFile);
  const basename = path.basename(filePath);
  const extname = path.extname(filePath);
  const importPath = basename.replace(new RegExp(`(.d)?${extname}$`), '');
  const sourceId = JSON.stringify({ importPath, typeName });

  const { virtual, destroy } =
    queues.get(sourceId) ||
    (() => {
      const virtualType = `Virtual${(Math.random() * 10000).toFixed()}Props`;
      const project = new Project();

      const source = project.createSourceFile(
        path.resolve(filePath, '../', `./${virtualType}.d.ts`),
        `
        import * as Ref from './${importPath}';

        export interface ${virtualType} extends Ref.${typeName} {}
      `
      );

      queues.set(sourceId, {
        virtual: [source, source.getInterface(virtualType)],
        destroy: debounce(1000 * 60 * 20, () => queues.delete(sourceId)),
      });

      return queues.get(sourceId);
    })();

  destroy();

  return virtual;
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

//* 依照指定路徑取得配對的 Type Text
const getMixedTypeByPath: Types.PrivateGetMixedTypeByPath = (
  mixedTypes,
  paths
) => {
  const target = JSON.stringify(paths);

  const path = Object.keys(mixedTypes).find(
    (path) => JSON.stringify(_toPath(path)) === target
  );

  return mixedTypes[path];
};

//* 依照指定路徑取得目標 Type
const getTypeByPath: Types.PrivateGetTypeByPath = (
  type,
  { extendTypes, info, paths, mixedTypes, source, superior = [] }
) => {
  if (paths.length) {
    const [callSignature] = type?.getCallSignatures().reverse() || [];
    const target = paths.shift();
    const currentPath = [...superior, target];

    if (callSignature) {
      switch (target) {
        case 'return':
          return getTypeByPath(callSignature.getReturnType(), {
            info: { propName: target, required: true },
            mixedTypes,
            paths,
            source,
          });

        case 'params': {
          const index = paths.shift();
          const param =
            callSignature.getParameters()[Number.parseInt(index, 10)];

          return getTypeByPath(param.getTypeAtLocation(source), {
            info: { propName: index, required: !param.isOptional() },
            mixedTypes,
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
            mixedTypes,
            paths,
            source,
            superior: currentPath,
          })
        : element.getUnionTypes().reduce<Types.TypeResult>(
            (result, union) =>
              result ||
              getTypeByPath(union, {
                info: subinfo,
                mixedTypes,
                paths: [...paths],
                source,
                superior: currentPath,
              }),
            null
          );
    }

    if (type?.isTuple() && /^\d+$/.test(target)) {
      const element = type.getTupleElements()[Number.parseInt(target, 10)];
      const subinfo = { propName: target, required: true };

      return !element.isUnion()
        ? getTypeByPath(element, {
            info: subinfo,
            mixedTypes,
            paths,
            source,
            superior: currentPath,
          })
        : element.getUnionTypes().reduce<Types.TypeResult>(
            (result, union) =>
              result ||
              getTypeByPath(union, {
                info: subinfo,
                mixedTypes,
                paths: [...paths],
                source,
                superior: currentPath,
              }),
            null
          );
    }

    if (!type?.isArray() && !type?.isTuple()) {
      const args = type?.getAliasTypeArguments() || [];
      const properties = type?.getProperties() || [];

      if (properties.length) {
        const symbol = getObjectProperty(type, target, extendTypes);

        if (symbol) {
          const element = symbol.getTypeAtLocation(source);

          const subinfo = {
            propName: target,
            required: !symbol.isOptional() || false,
          };

          if (element.getText() !== 'React.ReactNode' && element?.isUnion()) {
            const mixed = getMixedTypeByPath(mixedTypes, currentPath);

            const union = element
              .getUnionTypes()
              .find((union) => union.getText() === mixed);

            return (
              union &&
              getTypeByPath(union, {
                info: subinfo,
                mixedTypes,
                paths: [...paths],
                source,
                superior: currentPath,
              })
            );
          }

          return getTypeByPath(element, {
            info: subinfo,
            mixedTypes,
            paths,
            source,
            superior: currentPath,
          });
        }
      }

      if (args.length && type.getText().startsWith('Record<')) {
        const subinfo = { propName: target, required: true };
        const [, element] = args;

        return element.getText() === 'React.ReactNode' || !element?.isUnion()
          ? getTypeByPath(element, {
              info: subinfo,
              mixedTypes,
              paths,
              source,
              superior: currentPath,
            })
          : element.getUnionTypes().reduce<Types.TypeResult>(
              (result, union) =>
                result ||
                getTypeByPath(union, {
                  info: subinfo,
                  mixedTypes,
                  paths: [...paths],
                  source,
                  superior: currentPath,
                }),
              null
            );
      }
    }

    return null;
  }

  return type ? [type, info] : null;
};

//* Service Methods
export const parse: Types.ParseService = ({
  propPath = '',
  mixedTypes = {},
  filters,
  ...options
}) => {
  const [source, declaration] = getVirtualSource(options);

  const types = getTypeByPath(declaration.getType(), {
    extendTypes: declaration.getExtends().map((extend) => extend.getType()),
    info: { required: true },
    paths: _toPath(propPath),
    mixedTypes,
    source,
  });

  return (types && getProptype(...types, source, filters)) || null;
};
