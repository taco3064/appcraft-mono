import type { ReactNode } from 'react';

export interface ThemeProviderProps {
  children: ReactNode;
  disableCssBaseline?: boolean;
  themeid?: string;
}
