import { useMemo } from 'react';

import { InteractivedContext } from './InteractivedContext.hooks';
import type * as Types from './InteractivedContext.types';

export default function InteractivedProvider({
  children,
  propPath,
  mixedTypes,
  values,
  onChange,
  onMixedTypeMapping,
}: Types.InteractivedProviderProps) {
  const value = useMemo(
    () => ({
      propPath,
      mixedTypes,
      values,
      onChange,
      onMixedTypeMapping,
    }),
    [propPath, mixedTypes, values, onChange, onMixedTypeMapping]
  );

  return (
    <InteractivedContext.Provider value={value}>
      {children}
    </InteractivedContext.Provider>
  );
}
