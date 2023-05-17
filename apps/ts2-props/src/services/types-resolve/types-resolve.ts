import path from 'path';
import _toPath from 'lodash.topath';
import { Project } from 'ts-morph';
import { debounce } from 'throttle-debounce';

import { getProptype } from './types-resolve.utils';
import type * as Types from './types-resolve.types';

const queues: Types.QueueMap = new Map();

//* 依目標檔案位置取得 SourceFile 及 Declaration
const getDeclarationInfo: Types.PrivateGetDeclarationInfo = ({
  typeFile,
  typeName,
}) => {
  const filePath = path.resolve(process.cwd(), typeFile);

  const { info, destroy } =
    queues.get(filePath) ||
    (() => {
      const project = new Project();

      const reactSource = project.addSourceFileAtPath(
        path.resolve(process.cwd(), './node_modules/@types/react/index.d.ts')
      );

      const componentPropsType = reactSource
        .getModule('React')
        .getTypeAlias('ComponentProps');

      reactSource.replaceText(
        [componentPropsType.getStart(), componentPropsType.getEnd()],
        `
          type ComponentProps<T = unknown> = {};
        `
      );

      const source = project.addSourceFileAtPath(filePath);

      queues.set(filePath, {
        destroy: debounce(1000 * 60 * 20, () => queues.delete(filePath)),
        info: [
          source,
          source.getInterface(typeName) || source.getTypeAlias(typeName),
        ],
      });

      return queues.get(filePath);
    })();

  destroy();

  return info;
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
  { info, paths, mixedTypes, source, superior = [] }
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
        const symbol = type.getProperty(target);

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
  ...options
}) => {
  const [source, declaration] = getDeclarationInfo(options);

  const types = getTypeByPath(declaration.getType(), {
    info: { required: true },
    paths: _toPath(propPath),
    mixedTypes,
    source,
  });

  console.log(declaration.getType().getProperties().length);

  return (types && getProptype(...types, source)) || null;
};
