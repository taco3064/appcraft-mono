import type * as Types from './ProptypesResolve.types';

//* 定義 PropTypes 的檢查方式及回傳的 Config 內容 (要注意先後順序)
const generators: Types.Generators = [
  (type, info) =>
    type.getText() === 'React.ReactNode' && { ...info, type: 'node' },

  (type, info) => type.isBoolean() && { ...info, type: 'bool' },
  (type, info) => type.isNumber() && { ...info, type: 'number' },
  (type, info) => type.isString() && { ...info, type: 'string' },

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
              const proptype = getProptype(param.getTypeAtLocation(source), {
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
      const proptypes =
        type.isTuple() &&
        type
          .getTupleElements()
          .reduce<Types.PropTypesDef[]>((result, tuple, i) => {
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
          options: {
            required: info.required,
            type: 'oneOfType',
            options: proptypes,
          },
        }
      );
    }

    return false;
  },

  //* Object
  (type, info, source) => {
    if (type.isObject() || type.isInterface()) {
      if (source) {
        const properties = type
          .getProperties()
          .reduce<[string, Types.PropTypesDef][]>((result, property) => {
            const propName = property.getName();

            const proptype = getProptype(property.getTypeAtLocation(source), {
              propName,
              required: !property.isOptional(),
            });

            if (proptype) {
              result.push([propName, proptype]);
            }

            return result;
          }, []);

        return (
          properties.length > 0 && {
            ...info,
            type: 'exact',
            options: Object.fromEntries(properties),
          }
        );
      }

      return { ...info, type: 'exact' };
    }

    return false;
  },

  //* Union
  (type, info, source) => {
    if (type.isUnion()) {
      const [oneOf, oneOfType] = type
        .getUnionTypes()
        .reduce<[any[], Types.PropTypesDef[]]>(
          ([literals, types], union) => {
            if (union.isLiteral()) {
              literals.push(JSON.parse(union.getText()));
            } else {
              const proptype = getProptype(union, info, source);

              proptype && types.push(proptype);
            }

            return [literals, types];
          },
          [[], []]
        );

      if (!oneOfType.length && oneOf.length) {
        return { ...info, type: 'oneOf', options: oneOf };
      }

      if (!oneOf.length && oneOfType.length) {
        return {
          required: info.required,
          type: 'oneOfType',
          options: oneOfType,
        };
      }

      if (oneOf.length && oneOfType.length) {
        return {
          required: info.required,
          type: 'oneOfType',
          options: [...oneOfType, { ...info, type: 'oneOf', options: oneOf }],
        };
      }
    }

    return false;
  },
];

//* 取得目標 Type 對應的 PropTypes
export const getProptype: Types.PrivateGetProptype = (...args) =>
  generators.reduce((result, generator) => result || generator(...args), false);
