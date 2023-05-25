import React from 'react';
import _get from 'lodash.get';
import _set from 'lodash.set';
import _toPath from 'lodash.topath';

import { getPropPathString } from './EditorContext.utils';
import type * as Types from './EditorContext.types';

export const EditorContext = React.createContext<Types.EditorValue>({
  propPath: '',
  values: {},
  onChange: (v) => null,
  onMixedTypeMapping: () => null,
});

const useContext: Types.ContextHook = () =>
  React.useContext(EditorContext) as Types.EditorContextValue;

export const usePropPath = () => {
  const { propPath } = useContext();

  return propPath;
};

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
    const { fixedT } = useContext();

    return React.useMemo(
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

export const usePropValue: Types.PropValueHook = (propName) => {
  const { propPath, values, onChange } = useContext();

  return [
    (propName && _get(values, [..._toPath(propPath), propName])) || null,

    (value) => {
      const paths = [..._toPath(propPath), propName] as string[];

      if (Array.isArray(values)) {
        onChange?.([..._set(values, paths, value)] as object);
      } else {
        onChange?.({ ..._set(values as object, paths, value) });
      }
    },
  ];
};

export const useMixedTypeMapping: Types.MixedTypeMapping = (propName) => {
  const [, setTransition] = React.useTransition();
  const { propPath, mixedTypes, values, onMixedTypeMapping, onChange } =
    useContext();

  const path = React.useMemo(
    () =>
      getPropPathString(values, [..._toPath(propPath), propName] as string[]),
    [values, propPath, propName]
  );

  return [
    mixedTypes?.[path] || null,

    (mixedText) => {
      if (mixedText) {
        onMixedTypeMapping({ ...mixedTypes, [path]: mixedText });
      } else {
        delete mixedTypes[path];

        setTransition(() => {
          onMixedTypeMapping({ ...mixedTypes });

          if (Array.isArray(values)) {
            onChange?.([..._set(values, path, undefined)] as object);
          } else {
            onChange?.({ ..._set(values as object, path, undefined) });
          }
        });
      }
    },
  ];
};
