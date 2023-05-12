import Slide from '@mui/material/Slide';
import { ReactElement, forwardRef } from 'react';
import type { ThemeOptions } from '@mui/material/styles';
import type { TransitionProps } from '@mui/material/transitions';

const Transition = forwardRef(
  (
    props: TransitionProps & {
      children: ReactElement;
    },
    ref: React.Ref<unknown>
  ) => <Slide direction="up" ref={ref} {...props} />
);

Transition.displayName = 'Transition';

export const DEFAULT_THEME: ThemeOptions = {
  components: {
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
    MuiDialog: {
      defaultProps: {
        TransitionComponent: Transition,
      },
      styleOverrides: {
        paper: {
          borderRadius: 16,
        },
        paperFullScreen: {
          borderRadius: 0,
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          display: 'flex',
          gap: 16,
          paddingTop: 16,
          paddingBottom: 16,
        },
      },
    },
    MuiFilledInput: {
      defaultProps: {
        disableUnderline: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderRadius: 8,
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
    MuiToolbar: {
      styleOverrides: {
        root: {
          gap: 8,
        },
      },
    },
  },
};
