import Container from '@mui/material/Container';
import Fab from '@mui/material/Fab';
import Paper from '@mui/material/Paper';
import { forwardRef } from 'react';
import { withStyles } from 'tss-react/mui';

import type * as Types from './GridLayout.types';

export const GridLayoutContainer = withStyles(
  forwardRef<HTMLDivElement, Types.GridLayoutContainerProps>(
    ({ breakpoint: _breakpoint, ...props }, ref) => (
      <Container ref={ref} {...props} />
    )
  ),
  (theme, { breakpoint }) => ({
    root: {
      position: 'relative',
      height: 'auto',

      ...(breakpoint && {
        minWidth: theme.breakpoints.values[breakpoint],
      }),
    },
  }),
  { name: 'GridLayoutContainer' }
);

export const GridLayoutItem = withStyles(
  Paper,
  (theme) => ({
    root: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,

      transition: theme.transitions.create(['width', 'height'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
  }),
  { name: 'GridLayoutItem' }
);

export const GridLayoutItemContent = withStyles(
  Container,
  (theme) => ({
    root: {
      borderRadius: theme.shape.borderRadius,

      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden auto',
      height: '100%',

      '& > *': {
        border: '0 !important',
        boxShadow: 'none !important',
      },
    },
  }),
  { name: 'GridLayoutItemContent' }
);

export const GridLayoutItemAction = withStyles(
  Fab,
  (theme) => ({
    root: {
      position: 'absolute',
      bottom: theme.spacing(1),
      left: theme.spacing(1),
      zIndex: theme.zIndex.fab,
      gap: theme.spacing(1),
      color: theme.palette.common.white,

      '&:disabled': {
        backdropFilter: `blur(${theme.spacing(2)})`,
      },

      '& > hr': {
        borderColor: theme.palette.common.white,
        opacity: theme.palette.action.activatedOpacity,
      },
    },
  }),
  { name: 'GridLayoutItemAction' }
);
