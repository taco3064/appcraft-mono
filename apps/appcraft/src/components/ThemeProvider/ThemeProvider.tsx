import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

import { useThemeStyle } from '~appcraft/hooks';
import type { ThemeProviderProps } from './ThemeProvider.types';

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const theme = useThemeStyle();

  return !theme ? null : (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />

      {children}
    </MuiThemeProvider>
  );
}
