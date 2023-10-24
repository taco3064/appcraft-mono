import MuiList from '@mui/material/List';
import { withStyles } from 'tss-react/mui';
import type { ComponentProps } from 'react';

export type ListProps = Pick<
  ComponentProps<typeof MuiList>,
  'children' | 'dense' | 'disablePadding' | 'subheader'
>;

export const List = withStyles(
  (props: ListProps) => <MuiList {...props} />,
  (theme) => ({
    root: {
      background: theme.palette.background.paper,
    },
  }),
  { name: 'List' }
);
