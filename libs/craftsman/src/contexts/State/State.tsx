import * as React from 'react';
import type * as Types from './State.types';

const StateContext = React.createContext<Types.StateContextValue>({
  basePath: '',
});

export const useStateContext = () => {
  const { handleChangeRef, toggleRef, ...value } = React.useContext(
    StateContext
  ) as Required<Types.StateContextValue>;

  return {
    ...value,
    toggle: toggleRef?.current || null,
    onChange: handleChangeRef?.current || (() => null),
  };
};

export default function StateProvider({
  basePath,
  children,
  toggle,
  values,
  onChange,
}: Types.StateProviderProps) {
  const handleChangeRef = React.useRef(onChange);
  const toggleRef = React.useRef(toggle);

  const value = React.useMemo(
    () => ({ basePath, values, handleChangeRef, toggleRef }),
    [basePath, values]
  );

  React.useImperativeHandle(handleChangeRef, () => onChange, [onChange]);
  React.useImperativeHandle(toggleRef, () => toggle, [toggle]);

  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  );
}
