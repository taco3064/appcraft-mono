import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import CallSplitIcon from '@mui/icons-material/CallSplit';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import IconButton from '@mui/material/IconButton';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import SyncIcon from '@mui/icons-material/Sync';
import cx from 'clsx';
import { Handle, HandleProps } from 'reactflow';
import { withStyles } from 'tss-react/mui';
import type * as Appcraft from '@appcraft/types';

import { CompositeIcon } from './MuiIcon';
import { TypeItemAction } from './MuiListItemSecondaryAction';

export const DEFAULT_SIZE = {
  DAGRE: { width: 340, height: 60 },
  NODE: { width: 220, height: 60 },
};

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

export const TodoNodeLabel = (() => {
  interface TodoNodeLabelProps extends Pick<Appcraft.WidgetTodo, 'category'> {
    primary: string;
    secondary?: string;
    onDelete: () => void;

    classes?: {
      root?: string;
    };
  }

  return withStyles(
    ({
      classes,
      category,
      primary,
      secondary,
      onDelete,
    }: TodoNodeLabelProps) => {
      const color =
        category === 'variable'
          ? 'info'
          : category === 'fetch'
          ? 'success'
          : category === 'branch'
          ? 'warning'
          : 'secondary';

      return (
        <ListItemButton
          disableGutters
          className={classes?.root}
          sx={(theme) => ({
            background: `linear-gradient(to bottom right, ${theme.palette[color].main}, ${theme.palette[color].dark})`,
          })}
        >
          <ListItemIcon style={{ minWidth: 'none', marginRight: 8 }}>
            {category === 'variable' && <AutoFixHighIcon />}

            {category === 'fetch' && (
              <CompositeIcon primary={CloudQueueIcon} secondary={SyncIcon} />
            )}

            {category === 'branch' && <CallSplitIcon />}

            {category === 'iterate' && (
              <CompositeIcon primary={MenuIcon} secondary={SyncIcon} />
            )}
          </ListItemIcon>

          <ListItemText
            {...{ primary, secondary }}
            style={{ width: '100%' }}
            primaryTypographyProps={{
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
            }}
          />

          <TypeItemAction>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();

                onDelete();
              }}
            >
              <DeleteOutlineIcon />
            </IconButton>
          </TypeItemAction>
        </ListItemButton>
      );
    },
    (theme) => ({
      root: {
        borderRadius: theme.spacing(2),
        padding: theme.spacing(1, 2),
        ...DEFAULT_SIZE.NODE,

        '&:hover': {
          transform: 'scale(1.02)',
        },
      },
    }),
    { name: 'TodoNodeLabel' }
  );
})();
