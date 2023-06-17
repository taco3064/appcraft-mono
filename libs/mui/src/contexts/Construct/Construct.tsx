import { createContext, useContext, useMemo } from 'react';
import type * as Types from './Construct.types';

const ConstructContext = createContext<Types.ConstructContextValue>({
  paths: [],
  onWidgetChange: () => null,
});

export const useConstructContext = () => useContext(ConstructContext);

export function ConstructProvider({
  children,
  paths,
  widget,
  onWidgetChange,
}: Types.ConstructProviderProps) {
  const value = useMemo(
    () => ({ paths, widget, onWidgetChange }),
    [paths, widget, onWidgetChange]
  );

  return (
    <ConstructContext.Provider value={value}>
      {children}
    </ConstructContext.Provider>
  );
}
