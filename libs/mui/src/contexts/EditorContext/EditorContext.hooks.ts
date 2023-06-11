import { createContext, useContext, useMemo } from 'react';
import _get from 'lodash.get';
import _set from 'lodash.set';
import type * as Appcraft from '@appcraft/types';

import type * as Types from './EditorContext.types';

export const EditorContext = createContext<Types.EditorContextValue>({
  collectionPath: '',
  onChange: () => null,
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

export const useCollection: Types.CollectionHook = (defaultValues) => {
  const {
    collectionPath,
    values: { events, nodes, props },
  } = useContext(EditorContext) as Required<Types.EditorContextValue>;

  const source = useMemo(
    () =>
      Object.entries({ events, nodes, props }).reduce(
        (result, [type, options = {}]) => {
          Object.entries(options).forEach(([path, value]) => {
            if (path.startsWith(collectionPath)) {
              _set(result, path, type === 'props' ? value : Symbol(type));
            }
          });

          return result;
        },
        {}
      ),
    [collectionPath, events, nodes, props]
  );

  return {
    path: collectionPath,
    source,
    values: _get(source, collectionPath) || defaultValues || null,
  };
};

export const usePropValue = <V>(
  collectionType: Appcraft.CollectionType,
  widgetField: Appcraft.WidgetField,
  propName: string
) => {
  const {
    collectionPath,
    values,
    values: { events, nodes, props, [widgetField]: target },
    onChange,
  } = useContext(EditorContext) as Required<Types.EditorContextValue>;

  const propPath =
    collectionType === 'array'
      ? `${collectionPath}[${propName}]`
      : `${collectionPath ? `${collectionPath}.` : ''}${propName}`;

  return {
    path: propPath,

    value:
      (Object.assign({}, ...[events, nodes, props])[propPath] as V) || null,

    onChange: (value: V | null) => {
      delete (target as Record<string, unknown>)?.[propPath];

      onChange({
        ...values,
        [widgetField]: {
          ...target,
          ...((value || value === 0) && { [propPath]: value }),
        },
      } as Appcraft.NodeWidget);
    },
  };
};

export const useMixedTypeMapping: Types.MixedTypeMapping = (
  collectionType,
  widgetField,
  propName
) => {
  const {
    values: { mixedTypes, events, nodes, props, ...values },
    onChange,
  } = useContext(EditorContext) as Required<Types.EditorContextValue>;

  const { path: propPath } = usePropValue(
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
        });
      } else {
        delete mixedTypes?.[propPath];

        [events, nodes, props].forEach((options = {}) =>
          Object.keys(options).forEach((path) => {
            if (path.startsWith(propPath)) {
              delete (options as Record<string, unknown>)[path];
            }
          })
        );

        onChange({ ...values });
      }
    },
  ];
};
