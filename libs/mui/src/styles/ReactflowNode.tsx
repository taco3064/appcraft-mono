import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import { Handle, NodeProps, Position, useReactFlow } from 'reactflow';
import { withStyles } from 'tss-react/mui';

import type { TodoNode } from '../hooks';

export const DEFAULT_NODE_SIZE = { width: 240, height: 60 };

export const WidgetTodoNode = (() => {
  interface WidgetTodoNodeProps extends NodeProps<TodoNode['data']> {
    classes?: {
      root?: string;
      action?: string;
      handle?: string;
      primary?: string;
      secondary?: string;
      text?: string;
    };
  }

  return withStyles(
    ({ classes, data }: WidgetTodoNodeProps) => {
      const { category, defaultNextTodo } = data;
      const { deleteElements, getNode } = useReactFlow();

      const otherNodeKey =
        category === 'branch'
          ? 'metTodo'
          : category === 'iterate'
          ? 'iterateTodo'
          : null;

      return (
        <>
          <Handle
            type="target"
            className={classes?.handle}
            position={Position.Top}
          />

          <ListItemButton disableGutters className={classes?.root}>
            <ListItemIcon className={classes?.action}>
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();

                  deleteElements({ nodes: [{ id: data.id }] });
                }}
              >
                <DeleteOutlineIcon />
              </IconButton>
            </ListItemIcon>

            <ListItemText
              className={classes?.text}
              primary={data.description}
              secondary={data.category}
              primaryTypographyProps={{
                className: classes?.primary,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                textTransform: 'capitalize',
                variant: 'subtitle2',
                whiteSpace: 'nowrap',
              }}
              secondaryTypographyProps={{
                variant: 'caption',
                textTransform: 'capitalize',
                className: classes?.secondary,
              }}
            />
          </ListItemButton>

          {/^(variable|fetch)$/.test(data.category) && (
            <Handle
              type="source"
              id="defaultNextTodo"
              className={classes?.handle}
              position={Position.Bottom}
            />
          )}

          {data.category === 'branch' && (
            <>
              <Tooltip title="No">
                <Handle
                  type="source"
                  id="defaultNextTodo"
                  className={classes?.handle}
                  position={Position.Bottom}
                  style={{
                    left: 60,
                    right: 'auto',
                    transform: 'translate(-50%, 0)',
                  }}
                />
              </Tooltip>

              <Tooltip title="Yes">
                <Handle
                  type="source"
                  id="metTodo"
                  className={classes?.handle}
                  position={Position.Bottom}
                  style={{
                    left: 'auto',
                    right: 60,
                    transform: 'translate(50%, 0)',
                  }}
                />
              </Tooltip>
            </>
          )}

          {data.category === 'iterate' && (
            <>
              <Tooltip title="Completed">
                <Handle
                  type="source"
                  id="defaultNextTodo"
                  className={classes?.handle}
                  position={Position.Bottom}
                  style={{
                    left: 60,
                    right: 'auto',
                    transform: 'translate(-50%, 0)',
                  }}
                />
              </Tooltip>

              <Tooltip title="Iterate">
                <Handle
                  type="source"
                  id="iterateTodo"
                  className={classes?.handle}
                  position={Position.Bottom}
                  style={{
                    left: 'auto',
                    right: 60,
                    transform: 'translate(50%, 0)',
                  }}
                />
              </Tooltip>
            </>
          )}
        </>
      );
    },
    (theme, { data }) => {
      const { category } = data;

      const color =
        category === 'variable'
          ? 'info'
          : category === 'fetch'
          ? 'success'
          : category === 'branch'
          ? 'warning'
          : 'secondary';

      return {
        root: {
          borderRadius: theme.spacing(2),
          background: `linear-gradient(to bottom right, ${theme.palette[color].main}, ${theme.palette[color].dark})`,
          padding: theme.spacing(1, 2),
          ...DEFAULT_NODE_SIZE,

          '&:hover': {
            transform: 'scale(1.02)',
          },
        },
        handle: {
          background: theme.palette.text.secondary,
          width: 8,
          height: 8,
          zIndex: 1,
        },
        action: {
          minWidth: theme.spacing(5),
        },
        text: {
          margin: 0,
          width: '100%',
        },
        primary: {
          opacity: 1,
          color: theme.palette.getContrastText(theme.palette[color].main),
        },
        secondary: {
          opacity: theme.palette.action.disabledOpacity,
          color: theme.palette.getContrastText(theme.palette[color].main),
        },
      };
    },
    { name: 'WidgetTodoNode' }
  );
})();
