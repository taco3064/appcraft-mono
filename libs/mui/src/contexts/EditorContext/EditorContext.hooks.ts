import { createContext, useContext, useMemo } from 'react';
import _get from 'lodash.get';
import _set from 'lodash.set';
import type * as Appcraft from '@appcraft/types';

import type * as Types from './EditorContext.types';

export const EditorContext = (<V extends Types.OptionValues>() =>
  createContext<Types.EditorContextValue<V>>({
    collectionPath: '',
    onChange: () => null,
  }))();

export const useFixedT = (() => {
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

  return (defaultFixedT?: Types.FixedT) => {
    const { fixedT } = useContext(EditorContext);

    return useMemo<Types.FixedT>(
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

export const useCollection = <V extends Types.OptionValues>(
  defaultValues?: Types.Collection
) => {
  const { collectionPath, values } = useContext(EditorContext) as Required<
    Types.EditorContextValue<V>
  >;

  const source = useMemo<object>(() => {
    const fields: Appcraft.WidgetField[] = ['events', 'nodes', 'props'];

    return fields.reduce((result, field) => {
      const { [field as keyof V]: options } = values;

      Object.entries(options as Record<string, unknown>).forEach(
        ([path, value]) => {
          if (path.startsWith(collectionPath)) {
            _set(result, path, field === 'props' ? value : Symbol(field));
          }
        }
      );

      return {};
    }, {});
  }, [collectionPath, values]);

  return {
    path: collectionPath,
    source,
    values:
      ((_get(source, collectionPath) || defaultValues) as Types.Collection) ||
      null,
  };
};

export const usePropValue = <V extends Types.OptionValues, P = unknown>(
  collectionType: Appcraft.CollectionType,
  widgetField: keyof V,
  propName: string
) => {
  const fields: Appcraft.WidgetField[] = ['events', 'nodes', 'props'];

  const { collectionPath, values, onChange } = useContext(
    EditorContext
  ) as Required<Types.EditorContextValue<V>>;

  const propPath =
    collectionType === 'array'
      ? `${collectionPath}[${propName}]`
      : `${collectionPath ? `${collectionPath}.` : ''}${propName}`;

  return {
    path: propPath,

    value:
      (Object.assign(
        {},
        ...fields.map((field) => {
          const { [field as keyof V]: options } = values;

          return options;
        })
      )[propPath] as P) || null,

    onChange: (value: P | null) => {
      const { [widgetField]: target } = values;

      delete (target as Record<string, unknown>)?.[propPath];

      onChange({
        ...values,
        [widgetField]: {
          ...target,
          ...((value || value === 0) && { [propPath]: value }),
        },
      } as V);
    },
  };
};

export const useMixedTypeMapping = <V extends Types.OptionValues>(
  collectionType: Appcraft.CollectionType,
  widgetField: keyof V,
  propName: string
) => {
  const {
    values: { mixedTypes, ...values },
    onChange,
  } = useContext(EditorContext) as Required<Types.EditorContextValue<V>>;

  const { path: propPath } = usePropValue<V>(
    collectionType,
    widgetField,
    propName
  );

  return [
    mixedTypes?.[propPath] || null,

    (mixedText) => {
      if (mixedText) {
        onChange({
          ...values,
          mixedTypes: { ...mixedTypes, [propPath]: mixedText },
        } as V);
      } else {
        const fields: Appcraft.WidgetField[] = ['events', 'nodes', 'props'];

        delete mixedTypes?.[propPath];

        fields.forEach((field) => {
          const { [field as keyof V]: options } = values;

          Object.keys(options as Record<string, unknown>).forEach((path) => {
            if (path.startsWith(propPath)) {
              delete (options as Record<string, unknown>)[path];
            }
          });
        });

        onChange({ ...values } as V);
      }
    },
  ] as Types.MixedTypeMappingResult;
};
