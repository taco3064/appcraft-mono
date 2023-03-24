import ListItemIcon, { ListItemIconProps } from '@mui/material/ListItemIcon';
import { withStyles } from 'tss-react/mui';

interface SizedListItemIconProps extends ListItemIconProps {
  size?: 'small' | 'medium';
}

export const SizedListItemIcon = withStyles(
  ({ size: _size, ...props }: SizedListItemIconProps) => (
    <ListItemIcon {...props} />
  ),
  (theme, { size }) => ({
    root: {
      minWidth: theme.spacing(size === 'small' ? 5 : 7),
    },
  }),
  { name: 'SizedListItemIcon' }
);
