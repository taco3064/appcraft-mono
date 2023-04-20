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
  const valuesRef = React.useRef<typeof values>(null);

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

export const usePropValue: Types.PropValueHook = (propName) => {
  const {
    propPathState: [propPath],
    valuesRef: { current },
  } = useContext();

  return [
    !propName ? null : _get(current, [..._toPath(propPath), propName]),
    React.useCallback((value) => {
      console.log(value);
    }, []),
  ];
};
