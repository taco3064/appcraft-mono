import * as React from 'react';
import type * as Types from './State.types';

const StateContext = React.createContext<Types.StateContextValue>({
  basePath: '',
  disabled: false,
});

export const useStateContext = () => {
  const { disabled, handleChangeRef, toggleRef, ...value } = React.useContext(
    StateContext
  ) as Required<Types.StateContextValue>;

  return {
    ...value,
    disabled,
    toggle: (!disabled && toggleRef?.current) || null,
    onChange: (!disabled && handleChangeRef?.current) || (() => null),
  };
};

export default function StateProvider({
  basePath,
  children,
  disabled = false,
  toggle,
  values,
  onChange,
}: Types.StateProviderProps) {
  const handleChangeRef = React.useRef(onChange);
  const toggleRef = React.useRef(toggle);

  const value = React.useMemo(
    () => ({ basePath, disabled, values, handleChangeRef, toggleRef }),
    [basePath, disabled, values]
  );

  React.useImperativeHandle(handleChangeRef, () => onChange, [onChange]);
  React.useImperativeHandle(toggleRef, () => toggle, [toggle]);

  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  );
}
