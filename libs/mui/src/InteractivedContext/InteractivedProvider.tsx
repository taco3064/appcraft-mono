import * as Hooks from './InteractivedContext.hooks';
import type * as Types from './InteractivedContext.types';

export default function InteractivedProvider({
  InputStyles,
  children,
  values,
}: Types.InteractivedProviderProps) {
  const value = Hooks.useProviderValue({ InputStyles, values });

  return (
    <Hooks.InteractivedContext.Provider value={value}>
      {children}
    </Hooks.InteractivedContext.Provider>
  );
}
