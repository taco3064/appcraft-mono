import { useMemo } from 'react';

import { EditorContext } from './EditorContext.hooks';
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
    <EditorContext.Provider value={value}>{children}</EditorContext.Provider>
  );
}
