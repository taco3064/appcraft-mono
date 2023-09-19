import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import { withStyles } from 'tss-react/mui';

import type * as Types from './MuiListItemSecondaryAction.types';

export const TypeItemAction = withStyles(
  (props: Types.TypeItemActionProps) => (
    <ListItemSecondaryAction {...props} onClick={(e) => e.stopPropagation()} />
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
  { name: 'TypeItemAction' }
);
