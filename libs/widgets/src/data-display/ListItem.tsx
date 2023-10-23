import MuiListItem from '@mui/material/ListItem';
import { withStyles } from 'tss-react/mui';
import type { ComponentProps } from 'react';

export type ListItemProps = Pick<
  ComponentProps<typeof MuiListItem>,
  | 'alignItems'
  | 'children'
  | 'dense'
  | 'disableGutters'
  | 'disablePadding'
  | 'divider'
>;

export const ListItem = withStyles(
  (
    props: ListItemProps & {
      classes?: ComponentProps<typeof MuiListItem>['classes'];
    }
  ) => <MuiListItem {...props} />,
  (theme) => ({
    root: {
      padding: theme.spacing(1),
    },
  }),
  { name: 'ListItem' }
);
