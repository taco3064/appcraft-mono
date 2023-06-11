import { useMemo } from 'react';

import { EditorContext } from './EditorContext.hooks';
import type * as Types from './EditorContext.types';

export default function InteractivedProvider({
  children,
  collectionPath,
  fixedT,
  values,
  onChange,
}: Types.EditorProviderProps) {
  const value = useMemo(
    () => ({
      fixedT,
      collectionPath,
      values,
      onChange,
    }),
    [fixedT, collectionPath, values, onChange]
  );

  return (
    <EditorContext.Provider value={value}>{children}</EditorContext.Provider>
  );
}
