import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import CallSplitIcon from '@mui/icons-material/CallSplit';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import IconButton from '@mui/material/IconButton';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import LinkIcon from '@mui/icons-material/Link';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Paper from '@mui/material/Paper';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import SettingsIcon from '@mui/icons-material/Settings';
import StorageIcon from '@mui/icons-material/Storage';
import SyncIcon from '@mui/icons-material/Sync';
import _get from 'lodash/get';
import cx from 'clsx';
import { Handle } from 'reactflow';
import { withStyles } from 'tss-react/mui';

import { CompositeIcon } from '../MuiIcon';
import { TypeItemAction } from '../MuiListItemSecondaryAction';
import * as Types from './ReactFlow.types';

export const DEFAULT_SIZE = {
  DAGRE: { width: 240, height: 80 },
  NODE: { width: 220, height: 60 },
};

export const TodoBackground = withStyles(
  Paper,
  () => ({
    root: {
      position: 'relative',
      width: '100%',
      height: '100%',

      '& a[aria-label="React Flow attribution"]': {
        display: 'none !important',
      },
    },
  }),
  { name: 'TodoBackground' }
);

export const TodoHandle = withStyles(
  ({ classes, className, ...props }: Types.TodoHandleProps) => (
    <Handle {...props} className={cx(classes?.root, className)} />
  ),
  (theme, { type }) => ({
    root: {
      background: theme.palette.text.secondary,
      width: theme.spacing(1),
      height: theme.spacing(1),
      zIndex: theme.zIndex.fab,

      '&:hover': {
        borderColor: theme.palette.text.secondary,
        background: theme.palette.warning[type === 'source' ? 'light' : 'dark'],
      },
    },
  }),
  { name: 'TodoHandle' }
);

//* @WidgetTodo
export function TodoIcon({ variant }: Types.TodoIconProps) {
  switch (variant) {
    case 'variable':
      return <AutoFixHighIcon />;

    case 'fetch':
      return <CompositeIcon primary={CloudQueueIcon} secondary={SyncIcon} />;

    case 'branch':
      return <CallSplitIcon />;

    case 'iterate':
      return <CompositeIcon primary={MenuIcon} secondary={SyncIcon} />;

    case 'wrap':
      return <Inventory2OutlinedIcon />;

    case 'state':
      return <CompositeIcon primary={StorageIcon} secondary={SaveAltIcon} />;

    case 'props':
      return <CompositeIcon primary={SettingsIcon} secondary={SaveAltIcon} />;

    case 'search':
      return <LinkIcon />;

    default:
      return null;
  }
}

export const TodoNodeLabel = withStyles(
  ({
    classes,
    category,
    primary,
    secondary,
    onDelete,
  }: Types.TodoNodeLabelProps) => (
    <ListItemButton disableGutters className={classes?.root}>
      <ListItemIcon style={{ minWidth: 48, justifyContent: 'center' }}>
        <TodoIcon variant={category} />
      </ListItemIcon>

      <ListItemText
        {...{ primary, secondary }}
        primaryTypographyProps={{
          color: 'text.secondary',
          fontWeight: 'bolder',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          textTransform: 'capitalize',
          variant: 'subtitle2',
          whiteSpace: 'nowrap',
        }}
        secondaryTypographyProps={{
          color: 'text.secondary',
          variant: 'caption',
          textTransform: 'capitalize',
          display: 'flex',
        }}
      />

      <TypeItemAction>
        <IconButton onClick={onDelete}>
          <DeleteOutlineIcon />
        </IconButton>
      </TypeItemAction>
    </ListItemButton>
  ),
  (theme, { category }) => ({
    root: {
      background: `${_get(theme, Types.CategoryColor[category])} !important`,
      borderRadius: theme.spacing(2),
      padding: theme.spacing(1, 2),
      ...DEFAULT_SIZE.NODE,

      '&:hover': {
        opacity: 0.8,
        transform: 'scale(1.02)',
      },
    },
  }),
  { name: 'TodoNodeLabel' }
);
