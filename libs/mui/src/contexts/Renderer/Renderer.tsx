import { createContext, useContext, useMemo } from 'react';
import type * as Types from './Renderer.types';

const RendererContext = createContext<Types.RendererContextValue>({});

export const useRendererContext = () =>
  useContext(RendererContext) as Required<Types.RendererContextValue>;

export function RendererProvider({
  children,
  lazy,
}: Types.RendererProviderProps) {
  const value = useMemo(() => ({ lazy }), [lazy]);

  return (
    <RendererContext.Provider value={value}>
      {children}
    </RendererContext.Provider>
  );
}
