import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { Handle, NodeProps, Position } from 'reactflow';
import { withStyles } from 'tss-react/mui';

import type { TodoNode } from '../hooks';

export const DEFAULT_NODE_SIZE = { width: 180, height: 60 };

export const WidgetTodoNode = (() => {
  interface WidgetTodoNodeProps extends NodeProps<TodoNode['data']> {
    classes?: {
      root?: string;
      handle?: string;
      primary?: string;
      secondary?: string;
    };
  }

  return withStyles(
    ({ classes, data }: WidgetTodoNodeProps) => (
      <>
        <Handle
          type="target"
          className={classes?.handle}
          position={Position.Top}
        />

        <Paper className={classes?.root}>
          <Typography
            align="center"
            display="block"
            overflow="hidden"
            textOverflow="ellipsis"
            textTransform="capitalize"
            variant="subtitle2"
            whiteSpace="nowrap"
            className={classes?.primary}
          >
            {data.description}
          </Typography>

          <Typography
            alignItems="center"
            justifyContent="center"
            variant="caption"
            textTransform="capitalize"
            className={classes?.secondary}
          >
            {data.category}
          </Typography>
        </Paper>

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
    ),
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
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
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
        primary: {
          width: '100%',
          height: '50%',
          opacity: 1,
          color: theme.palette.getContrastText(theme.palette[color].main),
        },
        secondary: {
          width: '100%',
          height: '50%',
          opacity: theme.palette.action.disabledOpacity,
          color: theme.palette.getContrastText(theme.palette[color].main),
        },
      };
    },
    { name: 'WidgetTodoNode' }
  );
})();
