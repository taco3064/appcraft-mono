import { createTheme } from '@mui/material/styles';
import { MuiCssBaseline } from './style-overrides';

export const QUIET_NIGHTFALL = createTheme({
  palette: {
    mode: 'dark',
    divider: 'rgba(255, 255, 255, 0.12)',
    background: {
      paper: '#474448',
      default: '#2D232E',
    },
    primary: {
      light: '#F6D1CC',
      main: '#F3725B',
      dark: '#D93B3B',
      contrastText: '#fff',
    },
    secondary: {
      light: '#E9F6FC',
      main: '#51C7E8',
      dark: '#27A0B5',
      contrastText: '#fff',
    },
    info: {
      light: '#B5E3F5',
      main: '#5CB5E5',
      dark: '#3C8AB2',
      contrastText: '#fff',
    },
    success: {
      light: '#C0F4CB',
      main: '#6FDB7F',
      dark: '#4C8F58',
      contrastText: '#fff',
    },
    warning: {
      light: '#F9ECC7',
      main: '#F2C94C',
      dark: '#B8860B',
      contrastText: '#fff',
    },
    error: {
      light: '#F2B5C2',
      main: '#E92D4F',
      dark: '#AD1E3F',
      contrastText: '#fff',
    },
    text: {
      primary: '#FFFFFF',
      secondary: 'rgba(255, 255, 255, 0.7)',
      disabled: 'rgba(255, 255, 255, 0.5)',
    },
  },
  unstable_sxConfig: {
    borderColor: {
      themeKey: 'palette',
    },
  },
  components: {
    MuiCssBaseline,
    MuiTextField: {
      defaultProps: {
        fullWidth: true,
        margin: 'none',
        variant: 'filled',
      },
    },
  },
});
