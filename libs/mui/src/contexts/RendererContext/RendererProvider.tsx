import { useMemo } from 'react';

import { RendererContext } from './RendererContext.hooks';
import type { RendererProviderProps } from './RendererContext.types';

export default function RendererProvider({
  children,
  options,
}: RendererProviderProps) {
  const value = useMemo(
    () => ({
      options,
    }),
    [options]
  );

  return (
    <RendererContext.Provider value={value}>
      {children}
    </RendererContext.Provider>
  );
}
