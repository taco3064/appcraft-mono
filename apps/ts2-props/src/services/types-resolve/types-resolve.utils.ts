import type { OneOfProp, OneOfTypeProp, PropTypesDef } from '@appcraft/types';
import type * as Types from './types-resolve.types';

//* 定義 PropTypes 的檢查方式及回傳的 Config 內容 (要注意先後順序)
const generators: Types.Generators = [
  (type, info) => {
    if (
      type.isBooleanLiteral() ||
      type.isNumberLiteral() ||
      type.isStringLiteral()
    ) {
      return {
        ...info,
        type: 'oneOf',
        options: [JSON.parse(type.getText())],
      };
    }

    return false;
  },

  (type, info) => type.isBoolean() && { ...info, type: 'bool' },
  (type, info) => type.isNumber() && { ...info, type: 'number' },
  (type, info) => type.isString() && { ...info, type: 'string' },

  //* ReactNode / ReactElement
  (type, info) => {
    if (type.getText() === 'React.ReactNode') {
      return { ...info, type: 'node' };
    }

    if (type.getText().startsWith('React.ReactElement<')) {
      return { ...info, type: 'element' };
    }

    return false;
  },

  //* Class
  (type, info, source) => {
    const typeAtLocation =
      source && type.getSymbol()?.getTypeAtLocation(source);

    if (
      typeAtLocation?.getConstructSignatures().length &&
      type.getText() in global
    ) {
      return { ...info, type: 'instanceOf', options: type.getText() };
    }

    return false;
  },

  //* Function
  (type, info, source) => {
    const [callSignature] = type.getCallSignatures().reverse();

    if (callSignature) {
      if (source) {
        const returnProptype = getProptype(callSignature.getReturnType(), {
          propName: 'return',
          required: true,
        });

        return {
          ...info,
          type: 'func',
          options: {
            ...(returnProptype && { return: returnProptype }),
            params: callSignature.getParameters().reduce((result, param, i) => {
              const typeAtLocation = param.getTypeAtLocation(source);

              const proptype = getProptype(typeAtLocation, {
                propName: `[${i}]`,
                required: !param.isOptional(),
              });

              return !proptype ? result : result.concat(proptype);
            }, []),
          },
        };
      }

      return { ...info, type: 'func' };
    }

    return false;
  },

  //* Array
  (type, info) => {
    if (type.isArray()) {
      const proptype = getProptype(type.getArrayElementType(), {
        propName: '[*]',
        required: true,
      });

      return proptype && { ...info, type: 'arrayOf', options: proptype };
    }

    if (type.isTuple()) {
      const proptypes: PropTypesDef[] =
        type.isTuple() &&
        type.getTupleElements().reduce<PropTypesDef[]>((result, tuple, i) => {
          const proptype = getProptype(tuple, {
            propName: `[${i}]`,
            required: true,
          });

          return !proptype ? result : result.concat(proptype);
        }, []);

      return (
        proptypes.length > 0 && {
          ...info,
          type: 'arrayOf',
          options: proptypes,
        }
      );
    }

    return false;
  },

  //* Object
  (type, info, source) => {
    const properties = type.getProperties?.();

    if (type.isObject() || type.isInterface() || properties?.length) {
      if (source) {
        const args = type.getAliasTypeArguments();

        if (type.getText().startsWith('Record<') && args.length > 0) {
          const keys = getProptype(args[0], {
            propName: '*',
            required: false,
          });

          const options = getProptype(args[1], {
            propName: '*',
            required: false,
          });

          if (options && keys) {
            return keys.type !== 'oneOf'
              ? { ...info, type: 'objectOf', options }
              : {
                  ...info,
                  type: 'exact',
                  options: keys.options?.reduce(
                    (result, key) => ({
                      ...result,
                      [key as string]: {
                        ...options,
                        propName: key,
                      },
                    }),
                    {}
                  ),
                };
          }

          return false;
        }

        if (properties.length > 0) {
          const options = properties.reduce<[string, PropTypesDef][]>(
            (result, property) => {
              const propName = property.getName();
              const typeAtLocation = property.getTypeAtLocation(source);

              const proptype = getProptype(typeAtLocation, {
                propName,
                required: !property.isOptional(),
              });

              if (proptype) {
                result.push([propName, proptype]);
              }

              return result;
            },
            []
          );

          return (
            options.length > 0 && {
              ...info,
              type: 'exact',
              options: Object.fromEntries(options),
            }
          );
        }

        return false;
      }

      return { ...info, type: 'object' };
    }

    return false;
  },

  //* Union
  (type, info, source) => {
    if (type.isUnion()) {
      const [oneOf, oneOfType] = type
        .getUnionTypes()
        .reduce<[OneOfProp['options'], OneOfTypeProp['options']]>(
          ([literals, types], union) => {
            if (union.isLiteral()) {
              literals.push(JSON.parse(union.getText()));
            } else {
              const proptype = getProptype(union, info, source);

              proptype && types.push({ ...proptype, text: union.getText() });
            }

            return [literals, types];
          },
          [[], []]
        );

      if (!oneOfType.length && oneOf.length) {
        return { ...info, type: 'oneOf', options: oneOf };
      }

      if (oneOf.length && oneOfType.length) {
        return {
          ...info,
          type: 'oneOfType',
          options: [
            ...oneOfType,
            { ...info, type: 'oneOf', text: 'union', options: oneOf },
          ],
        };
      }

      if (!oneOf.length && oneOfType.length) {
        return oneOfType.length === 1
          ? oneOfType[0]
          : {
              ...info,
              type: 'oneOfType',
              options: oneOfType,
            };
      }
    }

    return false;
  },
];

//* 取得目標 Type 對應的 PropTypes
export const getProptype: Types.PrivateGetProptype = (type, info, source) =>
  generators.reduce(
    (result, generator) => result || generator(type, info, source),
    false
  );
