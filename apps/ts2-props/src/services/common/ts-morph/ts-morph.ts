import * as TsMorph from 'ts-morph';
import _toPath from 'lodash.topath';
import path from 'path';
import { MUI_WIDGETS } from '@appcraft/types';

import type * as Types from './ts-morph.types';

//* 依照指定路徑取得配對的 Type Text
const getMixedTypeByPath: Types.GetMixedTypeByPath = (mixedTypes, paths) => {
  const target = JSON.stringify(paths);

  const path = Object.keys(mixedTypes).find(
    (path) => JSON.stringify(_toPath(path)) === target
  );

  return mixedTypes[path];
};

//* 依目標檔案位置取得 SourceFile 及 Declaration
export const getSourceAndType: Types.GetSourceAndType = (() => {
  const { initialize, widgets } = MUI_WIDGETS;
  const project = new TsMorph.Project();

  initialize.forEach(({ typeFile, override }) => {
    const source = project.addSourceFileAtPath(
      path.resolve(process.cwd(), typeFile)
    );

    override.forEach(({ patternType, pattern, replacement, extractType }) => {
      const node = extractType.reduce<TsMorph.Node>(
        (result, { method, typeName }) => result[method](typeName),
        source
      );

      source.replaceText(
        [node.getStart(), node.getEnd()],
        node
          .getText()
          .replace(/\r?\n/g, '')
          .replace(
            patternType === 'string' ? pattern : new RegExp(pattern),
            replacement
          )
      );
    });
  });

  widgets.forEach(({ components }) =>
    components.forEach(({ typeFile, typeName, override }) => {
      const filePath = path.resolve(process.cwd(), typeFile);
      const source = project.addSourceFileAtPath(filePath);

      override?.forEach(({ patternType, pattern, replacement, extractBy }) => {
        const node = source[extractBy](typeName);

        source.replaceText(
          [node.getStart(), node.getEnd()],
          node
            .getText()
            .replace(/\r?\n/g, '')
            .replace(
              patternType === 'string' ? pattern : new RegExp(pattern),
              replacement
            )
        );
      });
    })
  );

  return ({ typeFile, typeName }) => {
    const filePath = path.resolve(process.cwd(), typeFile);

    const source =
      project.getSourceFile(filePath) || project.addSourceFileAtPath(filePath);

    return [
      source,
      source.getInterface(typeName)?.getType() ||
        source.getTypeAlias(typeName)?.getType() ||
        source
          .getExportSymbols()
          .find((exports) => {
            const type = exports.getDeclaredType();

            return (
              type?.getSymbol()?.getName() === typeName ||
              type?.getAliasSymbol()?.getName() === typeName
            );
          })
          ?.getDeclaredType(),
    ];
  };
})();

//* 依照指定路徑取得目標 Type
export const getTypeByPath: Types.GetTypeByPath = (
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
