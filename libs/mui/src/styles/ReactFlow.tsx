import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import CallSplitIcon from '@mui/icons-material/CallSplit';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import IconButton from '@mui/material/IconButton';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Paper from '@mui/material/Paper';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import StorageIcon from '@mui/icons-material/Storage';
import SyncIcon from '@mui/icons-material/Sync';
import _get from 'lodash/get';
import cx from 'clsx';
import { Handle, HandleProps } from 'reactflow';
import { withStyles } from 'tss-react/mui';
import type * as Appcraft from '@appcraft/types';
import type { ReactNode } from 'react';

import { CompositeIcon } from './MuiIcon';
import { TypeItemAction } from './MuiListItemSecondaryAction';

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

export const TodoHandle = (() => {
  interface TodoHandleProps extends HandleProps {
    className?: string;
    classes?: {
      root?: string;
    };
  }

  return withStyles(
    ({ classes, className, ...props }: TodoHandleProps) => (
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
          background:
            theme.palette.warning[type === 'source' ? 'light' : 'dark'],
        },
      },
    }),
    { name: 'TodoHandle' }
  );
})();

export function TodoIcon({
  variant,
}: {
  variant: Appcraft.WidgetTodo['category'];
}) {
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

    default:
      return null;
  }
}

export const TodoNodeLabel = (() => {
  interface TodoNodeLabelProps extends Pick<Appcraft.WidgetTodo, 'category'> {
    primary: ReactNode;
    secondary?: ReactNode;
    onDelete: () => void;

    classes?: {
      root?: string;
    };
  }

  enum CategoryColor {
    variable = 'palette.info.main',
    fetch = 'palette.secondary.main',
    branch = 'palette.success.main',
    iterate = 'palette.success.main',
    wrap = 'palette.info.main',
    state = 'palette.grey.700',
  }

  return withStyles(
    ({
      classes,
      category,
      primary,
      secondary,
      onDelete,
    }: TodoNodeLabelProps) => (
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
        background: `${_get(theme, CategoryColor[category])} !important`,
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
})();
