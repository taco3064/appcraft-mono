import AppBar from '@mui/material/AppBar';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Toolbar from '@mui/material/Toolbar';
import { withStyles } from 'tss-react/mui';
import type { MouseEventHandler, ReactNode } from 'react';

import { GapTypography } from './MuiTypography';
import { IconTipButton } from './MuiIconButton';
import type { FixedT } from '../contexts';

export const WidgetAppBar = (() => {
  interface WidgetAppBarProps {
    action?: ReactNode;
    children: ReactNode;

    classes?: {
      root?: string;
      action?: string;
      back?: string;
      toolbar?: string;
    };

    BackButtonProps?: {
      icon: ReactNode;
      text: string;
      onClick: MouseEventHandler<HTMLButtonElement>;
    };
  }

  return withStyles(
    ({ BackButtonProps, classes, action, children }: WidgetAppBarProps) => (
      <AppBar color="default" position="sticky" className={classes?.root}>
        <Toolbar variant="regular" className={classes?.toolbar}>
          <GapTypography
            variant="subtitle1"
            fontWeight="bolder"
            color="primary"
          >
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
})();
