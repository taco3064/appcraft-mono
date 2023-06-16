import { createContext, useContext, useMemo } from 'react';
import type * as Types from './Construct.types';

const ConstructContext = createContext<Types.ConstructContextValue>({
  onWidgetChange: () => null,
});

export const useConstructContext = () =>
  useContext(ConstructContext) as Required<Types.ConstructContextValue>;

export function ConstructProvider({
  children,
  widget,
  onWidgetChange,
}: Types.ConstructProviderProps) {
  const value = useMemo(
    () => ({ widget, onWidgetChange }),
    [widget, onWidgetChange]
  );

  return (
    <ConstructContext.Provider value={value}>
      {children}
    </ConstructContext.Provider>
  );
}
