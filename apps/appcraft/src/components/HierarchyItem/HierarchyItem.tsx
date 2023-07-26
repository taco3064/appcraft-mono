import FolderRoundedIcon from '@mui/icons-material/FolderRounded';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListItemButton from '@mui/material/ListItemButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { useFixedT } from '~appcraft/hooks';
import type * as Types from './HierarchyItem.types';

export default function HierarchyItem({
  mutation,
  data,
  icon: MuiIcon,
  onActionRender,
  onClick,
}: Types.HierarchyItemProps) {
  const [at] = useFixedT('app');
  const { type, name, description } = data;
  const action = (type === 'item' && onActionRender?.(data)) || null;

  return (
    <ImageListItem component={Paper} elevation={4}>
      <ListItemButton
        disableGutters
        color="info"
        onClick={() => onClick(data)}
        sx={(theme) => ({
          borderRadius: theme.spacing(2),
          justifyContent: 'center',
          padding: theme.spacing(4, 0, 4, 0),
        })}
      >
        {type === 'item' ? (
          <MuiIcon color="info" style={{ fontSize: 160 }} />
        ) : (
          <FolderRoundedIcon color="warning" style={{ fontSize: 160 }} />
        )}

        <ImageListItemBar
          subtitle={
            <Typography
              variant="body1"
              color="text.secondary"
              whiteSpace="pre-line"
            >
              {description || at('txt-no-description')}
            </Typography>
          }
          actionPosition="right"
          actionIcon={action}
          onClick={(e) => e.stopPropagation()}
        />
      </ListItemButton>

      <ImageListItemBar
        position="top"
        title={name}
        actionPosition="right"
        actionIcon={mutation}
      />
    </ImageListItem>
  );
}
