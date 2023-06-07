import { createContext, useContext, useMemo, useTransition } from 'react';
import _get from 'lodash.get';
import _set from 'lodash.set';

import type * as Types from './EditorContext.types';

export const EditorContext = createContext<Types.EditorContextValue>({
  structurePath: '',
  values: {},
  onChange: (v) => null,
  onMixedTypeMapping: () => null,
});

export const useFixedT: Types.FixedTHook = (() => {
  const replaces: Types.Replaces = [
    { pattern: /^[^-]+-/, replacement: '' },
    {
      pattern: /-(.)/g,
      replacement: (_match, letter) => ` ${letter.toUpperCase()}`,
    },
    {
      pattern: /^./,
      replacement: (match) => match.toUpperCase(),
    },
  ];

  return (defaultFixedT) => {
    const { fixedT } = useContext(EditorContext);

    return useMemo(
      () =>
        fixedT ||
        defaultFixedT ||
        ((key) =>
          replaces.reduce<string>(
            (result, { pattern, replacement }) =>
              result.replace(pattern, replacement as string),
            key
          )),
      [defaultFixedT, fixedT]
    );
  };
})();

export const useStructure: Types.StructureHook = (defaultValues) => {
  const { structurePath, values } = useContext(
    EditorContext
  ) as Required<Types.EditorContextValue>;

  const source = useMemo(() => {
    const { events, nodes, props } = values;

    return Object.entries({ events, nodes, props }).reduce(
      (result, [type, options = {}]) => {
        Object.entries(options).forEach(([path, value]) => {
          if (path.startsWith(structurePath)) {
            _set(result, path, type === 'props' ? value : Symbol(type));
          }
        });

        return result;
      },
      {}
    );
  }, [structurePath, values]);

  return {
    path: structurePath,
    source,
    values: _get(source, structurePath) || defaultValues || null,
  };
};

export const usePropValue: Types.PropValueHook = (
  widgetFieldName,
  propName,
  isStructureArray
) => {
  const { structurePath, values, onChange } = useContext(
    EditorContext
  ) as Required<Types.EditorContextValue>;

  const propPath = isStructureArray
    ? `${structurePath}[${propName}]`
    : `${structurePath ? `${structurePath}.` : ''}${propName}`;

  return {
    path: propPath,
    value: Object.assign({}, ...Object.values(values))[propPath] || null,
    onChange: (value) => onChange(widgetFieldName, { [propPath]: value }),
  };
};

export const useMixedTypeMapping: Types.MixedTypeMapping = (
  widgetFieldName,
  propName,
  isStructureArray
) => {
  const [, setTransition] = useTransition();

  const { path: propPath } = usePropValue(
    widgetFieldName,
    propName,
    isStructureArray
  );

  const { mixedTypes, values, onMixedTypeMapping, onChange } = useContext(
    EditorContext
  ) as Required<Types.EditorContextValue>;

  return [
    mixedTypes?.[propPath] || null,

    (mixedText) =>
      setTransition(() => {
        if (mixedText) {
          onMixedTypeMapping({ ...mixedTypes, [propPath]: mixedText });
        } else {
          delete mixedTypes[propPath];
          onMixedTypeMapping({ ...mixedTypes });

          Object.entries(values).forEach(([key, options = {}]) => {
            const field = key as Types.EditedField;

            Object.keys(options).forEach((path) => {
              if (path.startsWith(propPath)) {
                const { [field]: target } = values as Record<
                  string,
                  Record<string, object>
                >;

                delete target[path];
              }
            });

            onChange(field, { ...values[field] });
          });
        }
      }),
  ];
};
