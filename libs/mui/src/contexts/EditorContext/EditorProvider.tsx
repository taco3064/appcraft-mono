import { ComponentProps, useMemo } from 'react';

import { EditorContext } from './EditorContext.hooks';
import type * as Types from './EditorContext.types';

export default function InteractivedProvider<V extends Types.OptionValues>({
  children,
  collectionPath,
  fixedT,
  values,
  onChange,
}: Types.EditorProviderProps<V>) {
  const value = useMemo<Types.EditorContextValue<V>>(
    () => ({
      fixedT,
      collectionPath,
      values,
      onChange,
    }),
    [fixedT, collectionPath, values, onChange]
  );

  return (
    <EditorContext.Provider
      value={value as ComponentProps<typeof EditorContext.Provider>['value']}
    >
      {children}
    </EditorContext.Provider>
  );
}
