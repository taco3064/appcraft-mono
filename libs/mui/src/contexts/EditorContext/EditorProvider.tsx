import { useMemo } from 'react';

import { EditorContext } from './EditorContext.hooks';
import type * as Types from './EditorContext.types';

export default function InteractivedProvider({
  children,
  collectionPath,
  fixedT,
  mixedTypes,
  values,
  onChange,
  onMixedTypeMapping,
}: Types.EditorProviderProps) {
  const value = useMemo(
    () => ({
      fixedT,
      collectionPath,
      mixedTypes,
      values,
      onChange,
      onMixedTypeMapping,
    }),
    [fixedT, collectionPath, mixedTypes, values, onChange, onMixedTypeMapping]
  );

  return (
    <EditorContext.Provider value={value}>{children}</EditorContext.Provider>
  );
}
