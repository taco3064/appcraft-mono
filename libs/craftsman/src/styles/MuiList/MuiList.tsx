import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Skeleton from '@mui/material/Skeleton';

import type * as Types from './MuiList.types';

export function TypeListSkeleton({ count = 8 }: Types.TypeListSkeletonProps) {
  return (
    <List>
      {Array.from({ length: count }).map((_el, i) => (
        <ListItem key={i}>
          <ListItemIcon>
            <Skeleton variant="circular" width={40} height={40} />
          </ListItemIcon>

          <ListItemText
            disableTypography
            primary={<Skeleton variant="text" width="100%" />}
          />
        </ListItem>
      ))}
    </List>
  );
}
