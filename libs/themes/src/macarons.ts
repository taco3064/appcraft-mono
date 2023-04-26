import { createTheme } from '@mui/material/styles';

export const MACARONS = createTheme({
  palette: {
    mode: 'dark',
    divider: 'rgba(245,241,227,0.12)',
    background: {
      paper: '#212121',
      default: '#121212',
    },
    primary: {
      light: '#E57373',
      main: '#F06292',
      dark: '#F48FB1',
      contrastText: '#fff',
    },
    secondary: {
      light: '#64B5F6',
      main: '#90CAF9',
      dark: '#BBDEFB',
      contrastText: '#fff',
    },
    info: {
      light: '#4DD0E1',
      main: '#26C6DA',
      dark: '#00ACC1',
      contrastText: '#fff',
    },
    success: {
      light: '#81C784',
      main: '#4CAF50',
      dark: '#388E3C',
      contrastText: '#fff',
    },
    warning: {
      light: '#FFD54F',
      main: '#FFCA28',
      dark: '#FFB300',
      contrastText: '#fff',
    },
    error: {
      light: '#E57373',
      main: '#F44336',
      dark: '#D32F2F',
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
          color: '#121212',
        },
        containedSecondary: {
          color: '#212121',
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
