import { useMemo } from 'react';

import { InteractivedContext } from './InteractivedContext.hooks';
import type * as Types from './InteractivedContext.types';

export default function InteractivedProvider({
  InputStyles: { color = 'primary', size = 'small', variant = 'outlined' } = {},
  children,
  propPath,
  mixedTypes,
  values,
  onChange,
  onMixedTypeMapping,
}: Types.InteractivedProviderProps) {
  const value = useMemo(
    () => ({
      InputStyles: { color, size, variant },
      propPath,
      mixedTypes,
      values,
      onChange,
      onMixedTypeMapping,
    }),
    [
      color,
      size,
      variant,
      propPath,
      mixedTypes,
      values,
      onChange,
      onMixedTypeMapping,
    ]
  );

  return (
    <InteractivedContext.Provider value={value}>
      {children}
    </InteractivedContext.Provider>
  );
}
