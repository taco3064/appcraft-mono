import ListSubheader from '@mui/material/ListSubheader';
import Toolbar from '@mui/material/Toolbar';
import { forwardRef } from 'react';
import { withStyles } from 'tss-react/mui';

import type * as Types from './MuiListSubheader.types';

export const ListToolbar = withStyles(
  forwardRef<Types.ListToolbarRef, Types.ListToolbarProps>((props, ref) => (
    <ListSubheader ref={ref} {...props} {...{ component: Toolbar }} />
  )),
  (theme) => ({
    root: {
      background: 'inherit',
      gap: theme.spacing(1),
      padding: `${theme.spacing(0, 2)} !important`,
    },
  }),
  { name: 'ListToolbar' }
);
