import Divider from '@mui/material/Divider';
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';
import IconButton from '@mui/material/IconButton';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListItemButton from '@mui/material/ListItemButton';
import Menu from '@mui/material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

import { RemoveButton } from '../common';
import { HierarchyEditorButton } from '../HierarchyEditorButton';
import { removeHierarchy } from '~appcraft/services';
import { useFixedT } from '~appcraft/hooks';
import type * as Types from './HierarchyItem.types';

export default function HierarchyItem({
  data,
  icon: MuiIcon,
  onActionRender,
  onClick,
  onDataModify,
}: Types.HierarchyItemProps) {
  const [at] = useFixedT('app');
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement>(null);
  const { enqueueSnackbar } = useSnackbar();
  const { type, name, description } = data;

  const action = (type === 'item' && onActionRender?.(data)) || null;

  return (
    <ImageListItem
      component={Paper}
      elevation={4}
      sx={(theme) => ({ borderRadius: theme.spacing(2) })}
    >
      <ListItemButton
        disableGutters
        color="info"
        onClick={() => onClick(data)}
        sx={(theme) => ({
          borderRadius: theme.spacing(2),
          justifyContent: 'center',
          padding: theme.spacing(6, 0, 2, 0),
        })}
      >
        {type === 'item' ? (
          <MuiIcon color="info" style={{ fontSize: 160 }} />
        ) : (
          <FolderRoundedIcon color="warning" style={{ fontSize: 160 }} />
        )}

        {(description || action) && (
          <ImageListItemBar
            subtitle={
              <Typography
                variant="body1"
                color="text.secondary"
                whiteSpace="pre-line"
              >
                {description}
              </Typography>
            }
            actionPosition="right"
            actionIcon={action}
            onClick={(e) => e.stopPropagation()}
            sx={(theme) => ({
              borderRadius: theme.spacing(0, 0, 2, 2),
            })}
          />
        )}
      </ListItemButton>

      <ImageListItemBar
        position="top"
        title={name}
        actionPosition="right"
        actionIcon={
          <IconButton
            size="small"
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            <MoreVertIcon />
          </IconButton>
        }
        sx={(theme) => ({
          borderRadius: theme.spacing(2, 2, 0, 0),
        })}
      />

      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        PaperProps={{
          sx: (theme) => ({
            marginTop: theme.spacing(1),
          }),
        }}
      >
        <HierarchyEditorButton
          btnVariant="menu"
          mode="update"
          data={data}
          onCancel={() => setAnchorEl(null)}
          onConfirm={(modified) => {
            onDataModify('update', modified);
            setAnchorEl(null);
          }}
        />

        <Divider />

        <RemoveButton
          btnVariant="menu"
          onCancel={() => setAnchorEl(null)}
          onConfirm={async () => {
            await removeHierarchy(data._id);
            onDataModify('remove', data);
            setAnchorEl(null);
            enqueueSnackbar(at('txt-succeed-remove'), { variant: 'success' });
          }}
        />
      </Menu>
    </ImageListItem>
  );
}
