import AppBar from '@mui/material/AppBar';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Toolbar from '@mui/material/Toolbar';
import { withStyles } from 'tss-react/mui';
import type { MouseEventHandler, ReactNode } from 'react';

import { GapTypography } from './MuiTypography';
import { IconTipButton } from './MuiIconButton';
import type { FixedT } from '../contexts';

export const WidgetAppBar = (() => {
  type BackProps<P> =
    | P
    | (P & {
        ct: FixedT;
        onBackToStructure: MouseEventHandler<HTMLButtonElement>;
      });

  type WidgetAppBarProps = BackProps<{
    action?: ReactNode;
    children: ReactNode;

    classes?: {
      action?: string;
      back?: string;
    };
  }>;

  return withStyles(
    ({ classes, action, children, ...props }: WidgetAppBarProps) => (
      <AppBar color="default" position="sticky">
        <Toolbar variant="regular">
          <GapTypography
            variant="subtitle1"
            fontWeight="bolder"
            color="primary"
          >
            {'ct' in props && (
              <IconTipButton
                className={classes?.back}
                title={props.ct('btn-back')}
                onClick={props.onBackToStructure}
              >
                <ChevronLeftIcon />
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
        transform: `translateX(${theme.spacing(1)})`,
      },
      back: {
        transform: `translateX(${theme.spacing(-1)})`,
      },
    }),
    { name: 'WidgetAppBar' }
  );
})();
