import ListItemSecondaryAction, {
  ListItemSecondaryActionProps,
} from '@mui/material/ListItemSecondaryAction';
import { withStyles } from 'tss-react/mui';

export const TypeItemAction = withStyles(
  (props: Omit<ListItemSecondaryActionProps, 'onClick'>) => (
    <ListItemSecondaryAction {...props} onClick={(e) => e.stopPropagation()} />
  ),
  () => ({
    root: {
      position: 'static',
      transform: 'none',
    },
  }),
  { name: 'TypeItemAction' }
);
