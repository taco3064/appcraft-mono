import { createTheme } from '@mui/material/styles';

export const SPARKLING_CHAMPAGNE = createTheme({
  palette: {
    mode: 'dark',
    divider: 'rgba(255, 255, 255, 0.12)',
    background: {
      paper: '#232021',
      default: '#181616',
    },
    primary: {
      light: '#FFF5E1',
      main: '#FFE3A2',
      dark: '#FFD082',
      contrastText: '#2A2A2A',
    },
    secondary: {
      light: '#E3F6EA',
      main: '#BEE3D3',
      dark: '#A0D8C8',
      contrastText: '#2A2A2A',
    },
    info: {
      light: '#C9E6FF',
      main: '#92BDEA',
      dark: '#6F97C2',
      contrastText: '#2A2A2A',
    },
    success: {
      light: '#FFF3E3',
      main: '#FFD3A3',
      dark: '#FFBE80',
      contrastText: '#2A2A2A',
    },
    warning: {
      light: '#FEE7CC',
      main: '#F7B485',
      dark: '#EE9F68',
      contrastText: '#2A2A2A',
    },
    error: {
      light: '#FFC3D6',
      main: '#FF94A3',
      dark: '#FF6C83',
      contrastText: '#2A2A2A',
    },
    text: {
      primary: '#FFF5E1',
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
