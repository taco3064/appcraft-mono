import * as React from 'react';
import type * as Types from './Locales.types';

const LocalesContext = React.createContext<Types.LocalesContextValue | null>(
  null
);

const replaces: Types.Replaces = [
  { pattern: /^[^-]+-/, replacement: '' },
  {
    pattern: /-(.)/g,
    replacement: (_match, letter) => ` ${letter.toUpperCase()}`,
  },
  {
    pattern: /^./,
    replacement: (match) => match.toUpperCase(),
  },
];

export const useLocalesContext = () => {
  const fixedTRef = React.useContext(LocalesContext);

  return React.useMemo<Types.FixedT>(
    () =>
      fixedTRef?.current ||
      ((key) =>
        replaces.reduce<string>(
          (result, { pattern, replacement }) =>
            result.replace(pattern, replacement as string),
          key
        )),
    []
  );
};

export default function LocalesProvider({
  children,
  fixedT,
}: Types.LocalesProviderProps) {
  const fixedTRef = React.useRef(fixedT);

  React.useImperativeHandle(fixedTRef, () => fixedT, [fixedT]);

  return (
    <LocalesContext.Provider value={fixedTRef}>
      {children}
    </LocalesContext.Provider>
  );
}
