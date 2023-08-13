import Image from 'next/image';
import SvgIcon from '@mui/material/SvgIcon';
import { withStyles } from 'tss-react/mui';
import type { SvgIconProps } from '@mui/material/SvgIcon';

import LOGO from '~appcraft/assets/imgs/logo.svg';

export const SquareLogo = withStyles(
  (props: Omit<SvgIconProps, 'color' | 'component'>) => (
    <SvgIcon {...props} inheritViewBox viewBox="0 0 24 24" component={LOGO} />
  ),
  (theme) => ({
    root: {
      background: theme.palette.text.primary,
      borderRadius: theme.spacing(1),
      color: theme.palette.primary.dark,
    },
  }),
  { name: 'SquareLogo' }
);
