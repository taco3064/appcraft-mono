import MuiAppBar from '@mui/material/AppBar';
import { withStyles } from 'tss-react/mui';
import type { ComponentProps } from 'react';

export type AppBarProps = Pick<
  ComponentProps<typeof MuiAppBar>,
  'children' | 'color' | 'enableColorOnDark' | 'position'
>;

export const AppBar = withStyles(
  MuiAppBar,
  (theme) => ({
    root: {
      boxShadow: 'none',
    },
  }),
  { name: 'AppBar' }
);
