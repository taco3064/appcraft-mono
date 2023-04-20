import React from 'react';
import _get from 'lodash.get';
import _toPath from 'lodash.topath';
import type * as Types from './InteractivedContext.types';

export const InteractivedContext = React.createContext<Types.InteractivedValue>(
  {
    propPathState: ['', () => null],
  }
);

export const useProviderValue: Types.ProviderValueHook = ({
  values,
  InputStyles: { color = 'primary', size = 'small', variant = 'outlined' } = {},
}) => {
  const propPathState = React.useState<string>('');
  const valuesRef = React.useRef<typeof values>(values);

  React.useImperativeHandle(valuesRef, () => values, [values]);

  return React.useMemo(
    () => ({
      InputStyles: { color, size, variant },
      propPathState,
      valuesRef,
    }),
    [color, size, variant, propPathState, valuesRef]
  );
};

const useContext: Types.ContextHook = () =>
  React.useContext(InteractivedContext) as Types.CompleteValue;

export const useInputStyles: Types.InputStylesHook = () => {
  const { InputStyles: styles } = useContext();

  return styles;
};

export const usePropPath = () => {
  const { propPathState } = useContext();

  return propPathState;
};

export const usePropValue: Types.PropValueHook = (propName) => {
  const {
    propPathState: [propPath],
    valuesRef,
  } = useContext();

  console.log(valuesRef);

  return [
    (propName &&
      _get(valuesRef, ['current', ..._toPath(propPath), propName])) ||
      null,
    React.useCallback((value) => {
      console.log(value);
    }, []),
  ];
};
