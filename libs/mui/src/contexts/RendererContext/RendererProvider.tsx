import { useMemo } from 'react';

import { RendererContext } from './RendererContext.hooks';
import type { RendererProviderProps } from './RendererContext.types';

export default function RendererProvider({
  children,
  lazy,
}: RendererProviderProps) {
  const value = useMemo(() => ({ lazy }), [lazy]);

  return (
    <RendererContext.Provider value={value}>
      {children}
    </RendererContext.Provider>
  );
}
