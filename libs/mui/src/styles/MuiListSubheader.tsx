import ListSubheader, { ListSubheaderProps } from '@mui/material/ListSubheader';
import Toolbar from '@mui/material/Toolbar';
import { ComponentRef, forwardRef } from 'react';
import { withStyles } from 'tss-react/mui';

export const ListToolbar = withStyles(
  forwardRef<
    ComponentRef<typeof ListSubheader>,
    Omit<ListSubheaderProps, 'component'>
  >((props, ref) => (
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
