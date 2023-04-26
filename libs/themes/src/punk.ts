import { createTheme } from '@mui/material/styles';

export const PUNK = createTheme({
  palette: {
    mode: 'dark',
    divider: 'rgba(255,255,255,0.12)',
    background: {
      paper: '#1B1B1B',
      default: '#000000',
    },
    primary: {
      light: '#FF5252',
      main: '#FF1744',
      dark: '#D50000',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#E0E0E0',
      main: '#BDBDBD',
      dark: '#9E9E9E',
      contrastText: '#ffffff',
    },
    info: {
      light: '#90CAF9',
      main: '#2196F3',
      dark: '#1976D2',
      contrastText: '#ffffff',
    },
    success: {
      light: '#C5E1A5',
      main: '#8BC34A',
      dark: '#689F38',
      contrastText: '#ffffff',
    },
    warning: {
      light: '#FFE082',
      main: '#FFC107',
      dark: '#FFA000',
      contrastText: '#ffffff',
    },
    error: {
      light: '#E57373',
      main: '#F44336',
      dark: '#D32F2F',
      contrastText: '#ffffff',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255,255,255,0.7)',
      disabled: 'rgba(255,255,255,0.5)',
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
          color: '#000000',
        },
        containedSecondary: {
          color: '#1B1B1B',
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
