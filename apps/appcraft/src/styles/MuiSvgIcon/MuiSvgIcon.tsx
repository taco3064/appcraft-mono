import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SvgIcon from '@mui/material/SvgIcon';
import { withStyles } from 'tss-react/mui';

import LOGO from '~appcraft/assets/imgs/logo.svg';
import type * as Types from './MuiSvgIcon.types';

export const GridLayoutResizeHandle = withStyles(
  ArrowForwardIosIcon,
  (theme) => ({
    root: {
      cursor: 'nwse-resize',
      transform: 'rotate(45deg)',
      color: theme.palette.action.disabled,

      '&:hover': {
        color: theme.palette.action.active,
      },
    },
  }),
  { name: 'GridLayoutResizeHandle' }
);

export const SquareLogo = withStyles(
  (props: Types.SquareLogoProps) => (
    <SvgIcon {...props} inheritViewBox viewBox="0 0 24 24" component={LOGO} />
  ),
  (theme) => ({
    root: {
      borderRadius: theme.spacing(1),
      transform: 'rotate(-45deg)',
    },
  }),
  { name: 'SquareLogo' }
);
