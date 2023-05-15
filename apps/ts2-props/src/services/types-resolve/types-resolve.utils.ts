import type {
  FilterOptions,
  OneOfProp,
  OneOfTypeProp,
  PropTypesDef,
} from '@appcraft/types';

import type * as Types from './types-resolve.types';

const filter = <R extends PropTypesDef>(
  proptype: R | false,
  { types, names }: Partial<FilterOptions> = {}
) =>
  proptype &&
  (!types?.length || types.includes(proptype.type)) &&
  (!names?.length ||
    names.some((source) => new RegExp(source).test(proptype.propName)))
    ? proptype
    : false;

//* 定義 PropTypes 的檢查方式及回傳的 Config 內容 (要注意先後順序)
const generators: Types.Generators = [
  (type, info, opts) => {
    if (
      type.isBooleanLiteral() ||
      type.isNumberLiteral() ||
      type.isStringLiteral()
    ) {
      return filter(
        {
          ...info,
          type: 'oneOf',
          options: [JSON.parse(type.getText())],
        },
        opts?.filters
      );
    }

    return false;
  },

  (type, info, opts) =>
    filter(type.isBoolean() && { ...info, type: 'bool' }, opts?.filters),
  (type, info, opts) =>
    filter(type.isNumber() && { ...info, type: 'number' }, opts?.filters),
  (type, info, opts) =>
    filter(type.isString() && { ...info, type: 'string' }, opts?.filters),

  //* ReactNode / ReactElement
  (type, info, opts) => {
    if (type.getText() === 'React.ReactNode') {
      return filter({ ...info, type: 'node' }, opts?.filters);
    }

    if (type.getText().startsWith('React.ReactElement<')) {
      return filter({ ...info, type: 'element' }, opts?.filters);
    }

    return false;
  },

  //* Class
  (type, info, opts) => {
    if (
      opts?.source &&
      type.getSymbol()?.getTypeAtLocation(opts.source).getConstructSignatures()
        .length &&
      type.getText() in global
    ) {
      return filter(
        { ...info, type: 'instanceOf', options: type.getText() },
        opts?.filters
      );
    }

    return false;
  },

  //* Function
  (type, info, opts) => {
    const [callSignature] = type.getCallSignatures().reverse();

    if (callSignature) {
      if (opts?.source) {
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
              const proptype = getProptype(
                param.getTypeAtLocation(opts.source),
                {
                  propName: `[${i}]`,
                  required: !param.isOptional(),
                }
              );

              return !proptype ? result : result.concat(proptype);
            }, []),
          },
        };
      }

      return filter({ ...info, type: 'func' }, opts?.filters);
    }

    return false;
  },

  //* Array
  (type, info, opts) => {
    if (type.isArray()) {
      const proptype = getProptype(
        type.getArrayElementType(),
        {
          propName: '[*]',
          required: true,
        },
        { filters: { types: opts?.filters?.types } }
      );

      return (
        proptype &&
        filter({ ...info, type: 'arrayOf', options: proptype }, opts?.filters)
      );
    }

    if (type.isTuple()) {
      const proptypes: PropTypesDef[] =
        type.isTuple() &&
        type.getTupleElements().reduce<PropTypesDef[]>((result, tuple, i) => {
          const proptype = getProptype(
            tuple,
            {
              propName: `[${i}]`,
              required: true,
            },
            { filters: { types: opts?.filters?.types } }
          );

          return !proptype ? result : result.concat(proptype);
        }, []);

      return (
        proptypes.length > 0 &&
        filter(
          {
            ...info,
            type: 'arrayOf',
            options: proptypes,
          },
          opts?.filters
        )
      );
    }

    return false;
  },

  //* Object
  (type, info, opts) => {
    if (type.isObject() || type.isInterface()) {
      if (opts?.source) {
        const args = type.getAliasTypeArguments();
        const properties = type.getProperties();

        if (type.getText().startsWith('Record<') && args.length > 0) {
          const keys = getProptype(args[0], {
            propName: '*',
            required: false,
          });

          const options = getProptype(
            args[1],
            {
              propName: '*',
              required: false,
            },
            { filters: { types: opts?.filters?.types } }
          );

          if (options && keys) {
            return filter(
              keys.type !== 'oneOf'
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
                  },
              opts?.filters
            );
          }

          return false;
        }

        if (properties.length > 0) {
          const options = properties.reduce<[string, PropTypesDef][]>(
            (result, property) => {
              const propName = property.getName();

              const proptype = getProptype(
                property.getTypeAtLocation(opts.source),
                {
                  propName,
                  required: !property.isOptional(),
                },
                { filters: opts?.filters }
              );

              if (proptype) {
                result.push([propName, proptype]);
              }

              return result;
            },
            []
          );

          return filter(
            options.length > 0 && {
              ...info,
              type: 'exact',
              options: Object.fromEntries(options),
            },
            opts?.filters
          );
        }

        return false;
      }

      return filter({ ...info, type: 'object' }, opts?.filters);
    }

    return false;
  },

  //* Union
  (type, info, opts) => {
    if (type.isUnion()) {
      const [oneOf, oneOfType] = type
        .getUnionTypes()
        .reduce<[OneOfProp['options'], OneOfTypeProp['options']]>(
          ([literals, types], union) => {
            if (union.isLiteral()) {
              literals.push(JSON.parse(union.getText()));
            } else {
              const proptype = getProptype(union, info, opts);

              proptype && types.push({ ...proptype, text: union.getText() });
            }

            return [literals, types];
          },
          [[], []]
        );

      if (!oneOfType.length && oneOf.length) {
        return filter(
          { ...info, type: 'oneOf', options: oneOf },
          opts?.filters
        );
      }

      if (oneOf.length && oneOfType.length) {
        return filter(
          {
            ...info,
            type: 'oneOfType',
            options: [
              ...oneOfType,
              { ...info, type: 'oneOf', text: 'union', options: oneOf },
            ],
          },
          opts?.filters
        );
      }

      if (!oneOf.length && oneOfType.length) {
        return filter(
          oneOfType.length === 1
            ? oneOfType[0]
            : {
                ...info,
                type: 'oneOfType',
                options: oneOfType,
              },
          opts?.filters
        );
      }
    }

    return false;
  },
];

//* 取得目標 Type 對應的 PropTypes
export const getProptype: Types.PrivateGetProptype = (type, info, options) =>
  generators.reduce(
    (result, generator) => result || generator(type, info, options),
    false
  );
