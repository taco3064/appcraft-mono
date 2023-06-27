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

    //* Function
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

    //* Array
    if (/^\d+$/.test(target)) {
      const subinfo = { propName: target, required: true };
      const mixed = getMixedTypeByPath(mixedTypes, currentPath);

      const base =
        (type?.isArray()
          ? type.getArrayElementType()
          : type?.isTuple() &&
            type.getTupleElements()[Number.parseInt(target, 10)]) || null;

      const element =
        mixed &&
        base.getUnionTypes()?.find((union) => union.getText() === mixed);

      return getTypeByPath(element || base, {
        info: subinfo,
        mixedTypes,
        paths,
        source,
        superior: currentPath,
      });
    }

    //* Object
    const args = type?.getAliasTypeArguments() || [];
    const strIdxType = type?.getStringIndexType();
    const symbol = type.getProperty(target);

    if (symbol) {
      const base = symbol.getTypeAtLocation(source);
      const mixed = getMixedTypeByPath(mixedTypes, currentPath);

      const subinfo = {
        propName: target,
        required: !symbol.isOptional() || false,
      };

      const property =
        mixed &&
        base.getUnionTypes()?.find((union) => union.getText() === mixed);

      return getTypeByPath(property || base, {
        info: subinfo,
        mixedTypes,
        paths,
        source,
        superior: currentPath,
      });
    }

    if (
      strIdxType ||
      (type.getText().startsWith('Record<') && args.length > 0)
    ) {
      const subinfo = { propName: target, required: true };
      const base = strIdxType || args[1];
      const mixed = getMixedTypeByPath(mixedTypes, currentPath);

      const property =
        mixed &&
        base.getUnionTypes()?.find((union) => union.getText() === mixed);

      return getTypeByPath(property || base, {
        info: subinfo,
        mixedTypes,
        paths,
        source,
        superior: currentPath,
      });
    }

    return null;
  }

  return type ? [type, info] : null;
};
