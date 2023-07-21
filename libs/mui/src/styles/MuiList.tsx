import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Skeleton from '@mui/material/Skeleton';

export const TypeListSkeleton = (() => {
  type TypeListSkeletonProps = { count?: number };

  return ({ count = 8 }: TypeListSkeletonProps) => (
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
})();
