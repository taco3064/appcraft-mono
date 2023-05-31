import { useMemo } from 'react';

import { EditorContext } from './EditorContext.hooks';
import type * as Types from './EditorContext.types';

export default function InteractivedProvider({
  children,
  fixedT,
  propPath,
  mixedTypes,
  values,
  onChange,
  onMixedTypeMapping,
}: Types.EditorProviderProps) {
  const value = useMemo(
    () => ({
      fixedT,
      propPath,
      mixedTypes,
      values,
      onChange,
      onMixedTypeMapping,
    }),
    [fixedT, propPath, mixedTypes, values, onChange, onMixedTypeMapping]
  );

  return (
    <EditorContext.Provider value={value}>{children}</EditorContext.Provider>
  );
}
