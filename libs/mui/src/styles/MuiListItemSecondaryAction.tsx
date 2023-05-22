import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import { withStyles } from 'tss-react/mui';

export const TypeItemAction = withStyles(
  ListItemSecondaryAction,
  (theme) => ({
    root: {
      position: 'static',
      transform: 'none',
      height: theme.spacing(4.5),
    },
  }),
  { name: 'TypeItemAction' }
);
