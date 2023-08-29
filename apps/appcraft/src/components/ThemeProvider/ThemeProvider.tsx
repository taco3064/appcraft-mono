import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

import { useThemeStyle } from '~appcraft/contexts';
import type { ThemeProviderProps } from './ThemeProvider.types';

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const theme = useThemeStyle();

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />

      {children}
    </MuiThemeProvider>
  );
}
