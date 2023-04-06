import ButtonGroup from '@mui/material/ButtonGroup';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';
import IconButton from '@mui/material/IconButton';
import ListItemButton from '@mui/material/ListItemButton';
import Tooltip from '@mui/material/Tooltip';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

import { HierarchyEditorButton } from '../HierarchyEditorButton';
import { RemoveButton } from '../common';
import { useFixedT } from '~appcraft/hooks';
import type * as Types from './HierarchyCard.types';

export default function HierarchyCard({
  data,
  icon: MuiIcon,
}: Types.HierarchyCardProps) {
  const [at] = useFixedT('app');
  const { type, name, description } = data;

  return (
    <Card
      color="info"
      elevation={0}
      component={ListItemButton}
      disableGutters
      sx={{ display: 'block', paddingBottom: 0 }}
    >
      <CardHeader
        titleTypographyProps={{ variant: 'h6' }}
        title={name}
        avatar={
          type === 'item' ? (
            <MuiIcon color="info" style={{ fontSize: 48 }} />
          ) : (
            <FolderRoundedIcon color="warning" style={{ fontSize: 48 }} />
          )
        }
        action={
          type === 'item' && (
            <Tooltip title={at('btn-preview')}>
              <IconButton color="default">
                <VisibilityOutlinedIcon />
              </IconButton>
            </Tooltip>
          )
        }
      />

      <CardContent>{description}</CardContent>

      <ButtonGroup
        fullWidth
        variant="text"
        color="inherit"
        size="large"
        component={CardActions}
        onClick={(e) => e.stopPropagation()}
        sx={(theme) => ({
          borderRadius: theme.spacing(0, 0, 0.5, 0.5),
          borderTop: `1px solid ${theme.palette.divider}`,
          padding: 0,
          '& > * + *': { margin: '0 !important' },
        })}
      >
        <RemoveButton
          btnVariant="text"
          color="error"
          onConfirm={() => Promise.resolve()}
        />

        <HierarchyEditorButton btnVariant="text" mode="update" data={data} />
      </ButtonGroup>
    </Card>
  );
}
