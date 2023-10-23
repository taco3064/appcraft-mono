import MuiListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import { withStyles } from 'tss-react/mui';
import type { ComponentProps } from 'react';

export type ListItemSecondaryActionProps = Pick<
  ComponentProps<typeof MuiListItemSecondaryAction>,
  'children'
>;

export const ListItemSecondaryAction = withStyles(
  (
    props: ListItemSecondaryActionProps & {
      classes?: ComponentProps<typeof MuiListItemSecondaryAction>['classes'];
    }
  ) => (
    <MuiListItemSecondaryAction
      {...props}
      onClick={(e) => e.stopPropagation()}
    />
  ),
  () => ({
    root: {
      position: 'static',
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'nowrap',
      transform: 'none',
    },
  }),
  { name: 'ListItemSecondaryAction' }
);
