import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

import { useThemeStyle } from '~appcraft/hooks';
import type { ThemeProviderProps } from './Theme.types';

export default function ThemeProvider({
  children,
  disableCssBaseline = false,
  themeid,
}: ThemeProviderProps) {
  const theme = useThemeStyle(themeid);

  return (
    <MuiThemeProvider theme={theme}>
      {!disableCssBaseline && <CssBaseline />}

      {children}
    </MuiThemeProvider>
  );
}
