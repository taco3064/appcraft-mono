import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

import { useThemeStyle } from '~appcraft/hooks';
import type { ThemeProviderProps } from './Theme.types';

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const theme = useThemeStyle();

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />

      {children}
    </MuiThemeProvider>
  );
}
