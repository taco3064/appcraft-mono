import * as React from 'react';
import type * as Types from './State.types';

const StateContext = React.createContext<Types.StateContextValue>({
  basePath: '',
});

export const useStateContext = () => {
  const { handleChangeRef, ...value } = React.useContext(
    StateContext
  ) as Required<Types.StateContextValue>;

  return {
    ...value,
    onChange: handleChangeRef?.current || (() => null),
  };
};

export function StateProvider({
  basePath,
  children,
  values,
  onChange,
}: Types.StateProviderProps) {
  const handleChangeRef = React.useRef(onChange);
  const value = React.useMemo(
    () => ({ basePath, values, handleChangeRef }),
    [basePath, values]
  );

  React.useImperativeHandle(handleChangeRef, () => onChange, [onChange]);

  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  );
}
