import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { withStyles } from 'tss-react/mui';

import { GapTypography } from '../MuiTypography';
import { IconTipButton } from '../MuiIconButton';
import type * as Types from './MuiAppBar.types';

export const WidgetAppBar = withStyles(
  ({
    BackButtonProps,
    classes,
    action,
    children,
    sx,
  }: Types.WidgetAppBarProps) => (
    <AppBar color="default" position="sticky" className={classes?.root} sx={sx}>
      <Toolbar variant="regular" className={classes?.toolbar}>
        <GapTypography variant="subtitle1" fontWeight="bolder" color="primary">
          {BackButtonProps && ( // ct('btn-back')
            <IconTipButton
              className={classes?.back}
              title={BackButtonProps.text}
              onClick={BackButtonProps.onClick}
            >
              {BackButtonProps.icon}
            </IconTipButton>
          )}

          {children}
        </GapTypography>

        <Toolbar disableGutters className={classes?.action} variant="dense">
          {action}
        </Toolbar>
      </Toolbar>
    </AppBar>
  ),
  (theme) => ({
    action: {
      marginLeft: 'auto',
    },
    toolbar: {
      padding: `${theme.spacing(0, 2)} !important`,
    },
  }),
  { name: 'WidgetAppBar' }
);
