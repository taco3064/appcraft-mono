import React from 'react';
import _get from 'lodash.get';
import _set from 'lodash.set';
import _toPath from 'lodash.topath';
import type * as Types from './InteractivedContext.types';

export const InteractivedContext = React.createContext<Types.InteractivedValue>(
  {
    propPath: '',
    values: {},
    onChange: (v) => null,
  }
);

const useContext: Types.ContextHook = () =>
  React.useContext(InteractivedContext) as Types.CompleteValue;

export const useInputStyles: Types.InputStylesHook = () => {
  const { InputStyles: styles } = useContext();

  return styles;
};

export const usePropPath = () => {
  const { propPath } = useContext();

  return propPath;
};

export const usePropValue: Types.PropValueHook = (propName) => {
  const { propPath, values, onChange } = useContext();

  return [
    (propName && _get(values, [..._toPath(propPath), propName])) || null,

    React.useCallback(
      (value) => {
        const paths = [..._toPath(propPath), propName] as string[];

        if (Array.isArray(values)) {
          onChange?.([..._set(values, paths, value)] as object);
        } else {
          onChange?.({ ..._set(values as object, paths, value) });
        }
      },
      [propPath, propName, values, onChange]
    ),
  ];
};
