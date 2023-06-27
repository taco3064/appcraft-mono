import * as TsMorph from 'ts-morph';
import _toPath from 'lodash.topath';
import path from 'path';

import type * as Types from './ts-morph.types';

const project = new TsMorph.Project();

//* 依照指定路徑取得配對的 Type Text
const getMixedTypeByPath: Types.GetMixedTypeByPath = (mixedTypes, paths) => {
  const target = JSON.stringify(paths);

  const path = Object.keys(mixedTypes).find(
    (path) => JSON.stringify(_toPath(path)) === target
  );

  return mixedTypes[path];
};

//* 依目標檔案位置取得 SourceFile 及 Declaration (For Configurations)
export const getSourceAndType: Types.GetSourceAndType = ({
  typeFile,
  typeName,
}) => {
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

export const getWidgetSourceAndType: Types.GetSourceAndType = (() => {
  const source = project.addSourceFileAtPath(
    path.resolve(process.cwd(), './node_modules/@types/react/index.d.ts')
  );

  const aria = source.getModule('React').getInterface('AriaAttributes');

  source.replaceText(
    [aria.getStart(), aria.getEnd()],
    `type AriaAttributes = {};`
  );

  const attr = source.getModule('React').getInterface('HTMLAttributes');

  source.replaceText(
    [attr.getStart(), attr.getEnd()],
    `type HTMLAttributes<T> = {};`
  );

  return ({ typeFile, typeName }) => {
    const filePath = path.resolve(process.cwd(), typeFile);

    const source =
      project.getSourceFile(filePath) || project.addSourceFileAtPath(filePath);

    source.replaceText([0, 0], "import { ComponentProps } from 'react';");

    source.replaceText(
      [source.getEnd(), source.getEnd()],
      `type Pseudo_${typeName}Props = ComponentProps<typeof ${typeName}>;`
    );

    return [source, source.getTypeAlias(`Pseudo_${typeName}Props`).getType()];
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
