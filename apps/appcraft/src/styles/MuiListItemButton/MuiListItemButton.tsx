import ListItemButton from '@mui/material/ListItemButton';
import { withStyles } from 'tss-react/mui';

import type * as Types from './MuiListItemButton.types';

export const ExplorerMenuItem = withStyles(
  ({ anchor, ...props }: Types.ExplorerMenuItemProps) => (
    <ListItemButton {...props} />
  ),
  (theme, { anchor }) =>
    !anchor
      ? {}
      : {
          selected: {
            [anchor === 'top'
              ? 'borderBottom'
              : 'borderRight']: `2px solid ${theme.palette.primary.main}`,
          },
        },
  { name: 'ExplorerMenuItem' }
);
