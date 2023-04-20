import React from 'react';
import _get from 'lodash.get';
import _set from 'lodash.set';
import _toPath from 'lodash.topath';
import type * as Types from './InteractivedContext.types';

export const InteractivedContext = React.createContext<Types.InteractivedValue>(
  {
    propPath: '',
  }
);

export const useProviderValue: Types.ProviderValueHook = ({
  InputStyles: { color = 'primary', size = 'small', variant = 'outlined' } = {},
  propPath,
  values,
  onChange,
}) => {
  const valuesRef = React.useRef<[typeof values, (e: typeof values) => void]>([
    values,
    onChange,
  ]);

  React.useImperativeHandle(
    valuesRef,
    (): [typeof values, (e: typeof values) => void] => [values, onChange],
    [values, onChange]
  );

  return React.useMemo(
    () => ({
      InputStyles: { color, size, variant },
      propPath,
      valuesRef,
    }),
    [color, size, variant, propPath, valuesRef]
  );
};

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
  const { propPath, valuesRef } = useContext();

  return [
    (propName &&
      _get(valuesRef, ['current', 0, ..._toPath(propPath), propName])) ||
      null,

    React.useCallback(
      (value) => {
        const [values, onChange] = valuesRef.current || [];
        const paths = [..._toPath(propPath), propName] as string[];

        if (Array.isArray(values)) {
          onChange?.([..._set(values, paths, value)] as object);
        } else {
          onChange?.({ ..._set(values as object, paths, value) });
        }
      },
      [propPath, propName, valuesRef]
    ),
  ];
};
