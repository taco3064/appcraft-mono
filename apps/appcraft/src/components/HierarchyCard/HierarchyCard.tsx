import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';
import IconButton from '@mui/material/IconButton';
import ListItemButton from '@mui/material/ListItemButton';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

import type * as Types from './HierarchyCard.types';

export default function HierarchyCard({
  data,
  icon: MuiIcon,
}: Types.HierarchyCardProps) {
  const { type, name, description } = data;

  return (
    <Card
      color="info"
      elevation={0}
      component={ListItemButton}
      disableGutters
      sx={{ display: 'block' }}
    >
      <CardHeader
        titleTypographyProps={{ variant: 'h6' }}
        title={name}
        avatar={
          type === 'item' ? (
            <MuiIcon color="info" style={{ fontSize: 48 }} />
          ) : (
            <FolderRoundedIcon color="action" style={{ fontSize: 48 }} />
          )
        }
      />

      <CardContent>{description}</CardContent>

      <CardActions
        onClick={(e) => e.stopPropagation()}
        style={{ justifyContent: 'flex-end' }}
      >
        <IconButton color="error">
          <DeleteForeverOutlinedIcon />
        </IconButton>

        <IconButton color="success">
          <EditOutlinedIcon />
        </IconButton>

        {type === 'item' && (
          <IconButton color="default">
            <VisibilityOutlinedIcon />
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
}
