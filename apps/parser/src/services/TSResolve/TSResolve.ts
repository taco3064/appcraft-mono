import path from 'path';
import type * as TsMorph from 'ts-morph';
import { Project, SyntaxKind } from 'ts-morph';

import * as Types from './TSResolve.types';

//* 定義 PropTypes 的檢查方式及回傳的 Config 內容 (要注意先後順序)
const generators: Types.Generators = [
  (type, options) =>
    type.getText() === 'React.ReactNode' && { ...options, type: 'node' },

  (type, options) => type.isAny() && { ...options, type: 'any' },
  (type, options) => type.isBoolean() && { ...options, type: 'bool' },
  (type, options) => type.isNumber() && { ...options, type: 'number' },
  (type, options) => type.isString() && { ...options, type: 'string' },

  (type, options, source) => {
    const [callSignature] = type.getCallSignatures().reverse();

    if (callSignature) {
      const returnProptype = getProptype(
        callSignature.getReturnType(),
        { name: 'return', required: true },
        source
      );

      return {
        ...options,
        type: 'func',
        options: {
          ...(returnProptype && { return: returnProptype }),
          params: callSignature.getParameters().reduce((result, param, i) => {
            const proptype = getProptype(
              param.getTypeAtLocation(source),
              {
                name: `[${i}]`,
                required: !param.isOptional(),
              },
              source
            );

            return !proptype ? result : result.concat(proptype);
          }, []),
        },
      };
    }

    return false;
  },

  //* Examples: string[], (string | number)[], ('a' | 'b' | 'c')[]
  (type, options, source) => {
    if (type.isArray()) {
      const proptype = getProptype(
        type.getArrayElementType(),
        {
          name: '[*]',
          required: true,
        },
        source
      );

      return proptype && { ...options, type: 'arrayOf', options: proptype };
    }

    return false;
  },

  //* Examples: [boolean, string]
  (type, options, source) => {
    if (type.isTuple()) {
      const proptypes = type
        .getTupleElements()
        .reduce<Types.PropTypesDef[]>((result, tuple) => {
          const proptype = getProptype(
            tuple,
            {
              name: '[*]',
              required: true,
            },
            source
          );

          return !proptype ? result : result.concat(proptype);
        }, []);

      return (
        proptypes.length > 0 && {
          ...options,
          type: 'arrayOf',
          options: {
            required: true,
            type: 'oneOfType',
            options: proptypes,
          },
        }
      );
    }

    return false;
  },

  (type, options, source) => {
    if (type.isObject()) {
      const properties = type
        .getProperties()
        .reduce<Record<string, Types.PropTypesDef>>((result, property) => {
          console.log(property.getName());
          const proptype = getProptype(
            property.getTypeAtLocation(source),
            {
              name: property.getName(),
              required: !property.isOptional(),
            },
            source
          );

          return {
            ...result,
            ...(proptype && {
              [property.getName()]: proptype,
            }),
          };
        }, {});

      return (
        Object.keys(options).length > 0 && {
          ...options,
          type: 'exact',
          options: properties,
        }
      );
    }

    return false;
  },

  (type, options, source) => {
    if (type.isUnion()) {
      const [oneOf, oneOfType] = type
        .getUnionTypes()
        .reduce<[any[], Types.PropTypesDef[]]>(
          ([literals, types], union) => {
            if (union.isLiteral()) {
              literals.push(JSON.parse(union.getText()));
            } else {
              const proptype = getProptype(union, options, source);

              proptype && types.push(proptype);
            }

            return [literals, types];
          },
          [[], []]
        );

      if (!oneOfType.length && oneOf.length) {
        return { ...options, type: 'oneOf', options: oneOf };
      }

      if (!oneOf.length && oneOfType.length) {
        return {
          required: options.required,
          type: 'oneOfType',
          options: oneOfType,
        };
      }

      if (oneOf.length && oneOfType.length) {
        return {
          required: options.required,
          type: 'oneOfType',
          options: [
            ...oneOfType,
            { ...options, type: 'oneOf', options: oneOf },
          ],
        };
      }
    }

    return false;
  },
];

//* 取得目標 Type 對應的 PropTypes
const getProptype: Types.BaseGenerator = (...args) =>
  generators.reduce((result, generator) => result || generator(...args), false);

//* 建立虛擬的 Props 及 SourceFile
const getVirtualSource: Types.PrivateGetVirtualSource = (
  project,
  filePath,
  name
) => {
  const propsName = `Virtual${(Math.random() * 10000).toFixed()}Props`;

  const importFile = path
    .basename(filePath)
    .replace(path.extname(filePath), '')
    .replace(/\.d$/, '');

  return [
    propsName,
    project.createSourceFile(
      path.resolve(filePath, '../', `./${propsName}.d.ts`),
      `
        import * as Ref from './${importFile}';

        export interface ${propsName} extends Ref.${name} {}
      `
    ),
  ];
};

//* 解析 Interface 轉為 PropTypes
const resolveInterface: Types.PrivateResolveInterface = (
  source,
  declaration
) => {
  const properties: TsMorph.Symbol[] = [];

  declaration
    .getExtends()
    .forEach((extend) => properties.push(...extend.getType().getProperties()));

  properties.push(
    ...declaration.getProperties().map((property) => property.getSymbol())
  );

  return properties.reduce<Types.PropTypesDef[]>((result, property) => {
    const proptype = getProptype(
      property.getTypeAtLocation(source),
      {
        name: property.getName(),
        required: !property.isOptional(),
      },
      source
    );

    return !proptype ? result : result.concat(proptype);
  }, []);
};

//* Service Methods
export const resolvePropTypes: Types.Resolve = (options) => {
  const { tsFilePath, name = 'default', tsConfigDirPath } = options;
  const filePath = path.resolve(process.cwd(), tsFilePath);

  const project = new Project({
    tsConfigFilePath: path.resolve(
      process.cwd(),
      tsConfigDirPath,
      './tsconfig.json'
    ),
  });

  const source = project.addSourceFileAtPath(filePath);
  const target = source.getTypeAlias(name) || source.getInterface(name);

  switch (target?.getKind()) {
    case SyntaxKind.InterfaceDeclaration:
      return resolveInterface(source, target as TsMorph.InterfaceDeclaration);

    case SyntaxKind.TypeAliasDeclaration: {
      const [propsName, virtual] = getVirtualSource(project, filePath, name);

      return resolveInterface(virtual, virtual.getInterface(propsName));
    }
    default:
      return [];
  }
};
