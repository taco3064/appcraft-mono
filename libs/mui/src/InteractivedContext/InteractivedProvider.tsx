import * as Hooks from './InteractivedContext.hooks';
import type * as Types from './InteractivedContext.types';

export default function InteractivedProvider({
  InputStyles,
  children,
  propPath,
  values,
  onChange,
}: Types.InteractivedProviderProps) {
  const value = Hooks.useProviderValue({
    InputStyles,
    propPath,
    values,
    onChange,
  });

  return (
    <Hooks.InteractivedContext.Provider value={value}>
      {children}
    </Hooks.InteractivedContext.Provider>
  );
}
