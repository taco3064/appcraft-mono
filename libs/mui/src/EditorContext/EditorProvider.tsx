import { useMemo } from 'react';

import { InteractivedContext } from './EditorContext.hooks';
import type * as Types from './EditorContext.types';

export default function InteractivedProvider({
  children,
  propPath,
  mixedTypes,
  values,
  onChange,
  onMixedTypeMapping,
}: Types.EditorProviderProps) {
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
