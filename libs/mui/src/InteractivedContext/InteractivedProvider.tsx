import { useMemo } from 'react';

import { InteractivedContext } from './InteractivedContext.hooks';
import type * as Types from './InteractivedContext.types';

export default function InteractivedProvider({
  InputStyles: { color = 'primary', size = 'small', variant = 'outlined' } = {},
  children,
  propPath,
  values,
  onChange,
}: Types.InteractivedProviderProps) {
  const value = useMemo(
    () => ({
      InputStyles: { color, size, variant },
      propPath,
      values,
      onChange,
    }),
    [color, size, variant, propPath, values, onChange]
  );

  return (
    <InteractivedContext.Provider value={value}>
      {children}
    </InteractivedContext.Provider>
  );
}
