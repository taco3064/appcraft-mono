import FolderRoundedIcon from '@mui/icons-material/FolderRounded';
import Grow from '@mui/material/Grow';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListItemButton from '@mui/material/ListItemButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useDraggable, useDroppable } from '@dnd-kit/core';

import { useFixedT } from '~appcraft/hooks';
import type * as Types from './ArborCard.types';

export default function ArborCard({
  mutation,
  data,
  disableGroupChange = false,
  icon: MuiIcon,
  onActionRender,
  onClick,
}: Types.ArborCardProps) {
  const [at] = useFixedT('app');
  const { type, name, description } = data;
  const action = (type === 'item' && onActionRender?.(data)) || null;

  const dnd: Types.DndHook = {
    group: useDroppable({
      id: data._id,
      disabled: type === 'item',
    }),
    item: useDraggable({
      id: data._id,
      disabled: type === 'group' || disableGroupChange,
    }),
  };

  return (
    <Grow in>
      <ImageListItem
        ref={dnd[type].setNodeRef}
        component={Paper}
        elevation={4}
        sx={(theme) => ({
          padding: theme.spacing(0.25),
          transform: !dnd.item.transform
            ? undefined
            : `translate3d(${dnd.item.transform.x}px, ${dnd.item.transform.y}px, 0)`,

          ...(dnd.group.isOver && {
            border: `2px dashed ${theme.palette.action.selected}`,
            filter: `brightness(1.2)`,
            padding: 0,
          }),
        })}
        {...(type === 'item' && {
          ...dnd.item.attributes,
          ...dnd.item.listeners,
        })}
      >
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
        </ListItemButton>

        <ImageListItemBar
          position="top"
          title={name || at('msg-no-title')}
          actionPosition="right"
          actionIcon={mutation}
        />

        <ImageListItemBar
          actionPosition="right"
          actionIcon={action}
          onClick={(e) => e.stopPropagation()}
          sx={{
            '& > .MuiImageListItemBar-actionIcon': {
              display: 'flex',
            },
          }}
          subtitle={
            <Typography
              variant="body1"
              color="text.secondary"
              whiteSpace="pre-line"
              display="-webkit-box"
              overflow="hidden"
              style={{ WebkitBoxOrient: 'vertical', WebkitLineClamp: 2 }}
            >
              {description || at('txt-no-description')}
            </Typography>
          }
        />
      </ImageListItem>
    </Grow>
  );
}
