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
      light: colors.deepOrange['A100'],
      main: colors.deepOrange['A200'],
      dark: colors.deepOrange['A400'],
      contrastText: '#fff',
    },
    secondary: {
      light: colors.orange['A200'],
      main: colors.orange['A400'],
      dark: colors.orange['A700'],
      contrastText: '#fff',
    },
    info: {
      light: colors.cyan[300],
      main: colors.cyan[500],
      dark: colors.cyan[800],
      contrastText: '#fff',
    },
    success: {
      light: colors.lime[300],
      main: colors.lime[500],
      dark: colors.lime[800],
      contrastText: '#fff',
    },
    warning: {
      light: colors.amber[300],
      main: colors.amber[500],
      dark: colors.amber[800],
      contrastText: '#fff',
    },
    error: {
      light: colors.deepOrange[300],
      main: colors.deepOrange[500],
      dark: colors.deepOrange[800],
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
