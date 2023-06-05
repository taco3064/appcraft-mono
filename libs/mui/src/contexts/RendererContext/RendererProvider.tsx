import { useMemo } from 'react';

import { RendererContext } from './RendererContext.hooks';
import type * as Types from './RendererContext.types';

export default function RendererProvider<T extends Types.RenderType>({
  children,
  options,
}: Types.RendererProviderProps<T>) {
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
