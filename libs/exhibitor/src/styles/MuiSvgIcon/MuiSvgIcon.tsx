import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { withStyles } from 'tss-react/mui';

export const ResizeHandle = withStyles(
  ArrowForwardIosIcon,
  (theme) => ({
    root: {
      cursor: 'nwse-resize',
      transform: 'rotate(45deg) translate(0px, 8px)',
      color: theme.palette.action.disabled,
      outline: 'none !important',

      '&:hover': {
        color: theme.palette.action.active,
      },
    },
  }),
  { name: 'GridLayoutResizeHandle' }
);
