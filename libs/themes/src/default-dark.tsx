import { createTheme } from '@mui/material/styles';
import * as colors from '@mui/material/colors';

export const DEFAULT_DARK = createTheme({
  palette: {
    mode: 'dark',
    divider: 'rgba(245,241,227,0.12)',
    background: {
      paper: '#474448',
      default: '#2D232E',
    },
    primary: {
      light: '#F18C7E',
      main: '#ED6A5A',
      dark: '#E94A35',
      contrastText: '#fff',
    },
    secondary: {
      light: '#B4D0CC',
      main: '#9BC1BC',
      dark: '#82B0AA',
      contrastText: '#fff',
    },
    info: {
      light: '#8093C6',
      main: '#6279B8',
      dark: '#4C65A9',
      contrastText: '#fff',
    },
    success: {
      light: '#DCFF5C',
      main: '#D2FF28',
      dark: '#CAFF0A',
      contrastText: '#fff',
    },
    warning: {
      light: '#F6E879',
      main: '#F4E04D',
      dark: '#F2DA2C',
      contrastText: '#fff',
    },
    error: {
      light: '#C43173',
      main: '#9A275A',
      dark: '#83214D',
      contrastText: '#fff',
    },
    text: {
      primary: 'rgb(245,241,227)',
      secondary: 'rgba(245,241,227,0.7)',
      disabled: 'rgba(245,241,227,0.5)',
    },
  },
  unstable_sxConfig: {
    borderColor: {
      themeKey: 'palette',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        containedInherit: {
          color: '#2D232E',
        },
        containedSecondary: {
          color: '#474448',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        fullWidth: true,
        margin: 'none',
        variant: 'filled',
      },
    },
    MuiCssBaseline: {
      styleOverrides: (theme) => ({
        body: {
          background: theme.palette.background.default,
          color: theme.palette.text.primary,
          margin: 0,
          padding: 0,
          height: global.window?.innerHeight || '100vh',
          overflow: 'hidden auto',

          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            width: `${theme.spacing(0.5)} !important`,
            height: `${theme.spacing(0.5)} !important`,
          },
          '&::-webkit-scrollbar-track, & *::-webkit-scrollbar-track': {
            background: theme.palette.background.paper,
            borderRadius: theme.shape.borderRadius,
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            background: theme.palette.primary.main,
            borderRadius: theme.shape.borderRadius,
          },
          '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover':
            {
              background: theme.palette.secondary.main,
            },
        },
      }),
    },
  },
});
