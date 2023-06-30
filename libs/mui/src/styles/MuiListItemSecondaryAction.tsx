import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import { withStyles } from 'tss-react/mui';

export const TypeItemAction = withStyles(
  ListItemSecondaryAction,
  () => ({
    root: {
      position: 'static',
      transform: 'none',
    },
  }),
  { name: 'TypeItemAction' }
);
