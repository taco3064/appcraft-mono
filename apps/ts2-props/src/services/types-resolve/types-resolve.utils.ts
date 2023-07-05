import type * as Appcraft from '@appcraft/types';
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
    if (/\.ReactNode$/.test(type.getText())) {
      return { ...info, type: 'node' };
    }

    if (/\.ReactElement<.+>$/.test(type.getText())) {
      return { ...info, type: 'element' };
    }

    return false;
  },

  //* Class
  (type, info) => {
    if (type.getText() in global) {
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

  //* Union
  (type, info, source) => {
    if (type.getText() === 'unknown') {
      return {
        ...info,
        type: 'oneOfType',
        options: ['bool', 'number', 'string'].map((type) => ({
          ...info,
          type: type as Appcraft.PropTypesDef['type'],
          text: type,
        })),
      };
    } else if (type.isUnion()) {
      const [oneOf, oneOfType] = type
        .getUnionTypes()
        .reduce<
          [Appcraft.OneOfProp['options'], Appcraft.OneOfTypeProp['options']]
        >(
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

  //* Array
  (type, info, source) => {
    const isArray = type.isArray();
    const isTuple = type.isTuple();

    if (isArray || isTuple) {
      if (source) {
        const options = isArray
          ? getProptype(type.getArrayElementType(), {
              propName: '[*]',
              required: true,
            })
          : type
              .getTupleElements()
              .reduce<Appcraft.PropTypesDef[]>((result, tuple, i) => {
                const proptype = getProptype(tuple, {
                  propName: `[${i}]`,
                  required: true,
                });

                return !proptype ? result : result.concat(proptype);
              }, []);

        if ((Array.isArray(options) && options.length) || options) {
          return { ...info, type: 'arrayOf', options };
        }
      }

      return { ...info, type: 'array' };
    }

    return false;
  },

  //* Object
  (type, info, source) => {
    if (source) {
      const args = type.getAliasTypeArguments();
      const properties = type.getProperties?.();
      const strIdxType = type.getStringIndexType();

      if (properties.length > 0) {
        const options = properties.reduce<[string, Appcraft.PropTypesDef][]>(
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

      //* { [key: string]: value; }
      if (strIdxType) {
        const options = getProptype(
          strIdxType,
          {
            propName: '*',
            required: false,
          },
          source
        );

        return options && { ...info, type: 'objectOf', options };
      }

      //* Record<key, value>
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
      }

      return false;
    }

    if (type.isObject() || type.isInterface()) {
      return { ...info, type: 'object' };
    }

    return false;
  },
];

//* 取得目標 Type 對應的 PropTypes
export const getProptype: Types.GetProptypeUtil = (type, info, source) =>
  /(React\.Ref<|RefObject<|Ref<)/.test(type.getText())
    ? false
    : generators.reduce((result, generator) => {
        if (!result) {
          return generator(type, info, source);
        }

        return result;
      }, false);

export const findNodesAndEventsProps: Types.FindNodesAndEventsPropsUtil = (
  source,
  type,
  { info, paths = [] }
) => {
  const proptype = getProptype(type, info, source);

  if (proptype) {
    if (/^(element|node)$/.test(proptype.type)) {
      return {
        nodes: { [paths.join('.')]: proptype.type as Appcraft.NodeType },
      };
    } else if (
      proptype.type === 'func' &&
      /^on[A-Z]/.test(info.propName || '')
    ) {
      return {
        events: [paths.join('.')],
      };
    } else if (proptype.type === 'exact') {
      const properties = type.getProperties?.() || [];

      return properties.reduce(
        ({ nodes, events }, property) => {
          const propName = property.getName();

          if (!/^(sx|style)$/.test(propName)) {
            const $type = property.getTypeAtLocation(source);

            if ($type.getText() !== 'React.CSSProperties') {
              const result = findNodesAndEventsProps(source, $type, {
                info: { propName, required: !property.isOptional() },
                paths: [...paths, propName],
              });

              return {
                nodes: { ...nodes, ...result.nodes },
                events: [...events, ...(result.events || [])],
              };
            }
          }

          return { nodes, events };
        },
        { nodes: {}, events: [] }
      );
    }
  }

  return {};
};
