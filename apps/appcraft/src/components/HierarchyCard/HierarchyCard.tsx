import ListItemButton from '@mui/material/ListItemButton';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';

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

      <CardActions>sd</CardActions>
    </Card>
  );
}
