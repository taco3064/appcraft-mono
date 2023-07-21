import AppBar from '@mui/material/AppBar';
import ButtonGroup from '@mui/material/ButtonGroup';
import CloseIcon from '@mui/icons-material/Close';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import { FormEventHandler, ReactNode } from 'react';
import { withStyles } from 'tss-react/mui';

import { GapTypography } from './MuiTypography';

export const FlexDialog = (() => {
  interface FlexDialogProps extends Omit<DialogProps, 'onSubmit'> {
    icon?: ReactNode;
    title?: string;
    action?: ReactNode;
    children: ReactNode;
    direction?: 'row' | 'column';
    onSubmit?: FormEventHandler<HTMLFormElement>;
  }

  return withStyles(
    ({
      PaperProps,
      icon,
      title,
      action,
      children,
      onClose,
      onSubmit,
      direction: _direction,
      ...props
    }: FlexDialogProps) => (
      <Dialog
        {...props}
        onClose={onClose}
        PaperProps={{
          elevation: 0,
          ...PaperProps,
          ...(onSubmit &&
            ({
              component: 'form',
              onSubmit,
            } as object)),
        }}
      >
        {(title || icon) && (
          <AppBar
            enableColorOnDark
            position="static"
            elevation={0}
            sx={{
              background: !props.fullScreen
                ? 'transparent'
                : (theme) => theme.palette.secondary.dark,
            }}
          >
            <Toolbar
              variant="regular"
              sx={(theme) => ({ color: theme.palette.common.white })}
            >
              <GapTypography
                {...(!props.fullScreen && { marginX: 'auto' })}
                variant="h5"
                color={props.fullScreen ? 'inherit' : 'primary'}
                fontWeight="bolder"
              >
                {icon}
                {title}
              </GapTypography>

              {props.fullScreen && onClose && (
                <IconButton
                  size="small"
                  color="inherit"
                  onClick={(e) => onClose(e, 'escapeKeyDown')}
                  sx={(theme) => ({
                    position: 'absolute',
                    right: theme.spacing(2),
                    top: '50%',
                    transform: 'translate(0, -50%)',
                  })}
                >
                  <CloseIcon />
                </IconButton>
              )}
            </Toolbar>

            <Divider
              sx={(theme) => ({
                margin: theme.spacing(0, 3),
              })}
            />
          </AppBar>
        )}

        <DialogContent role="contentinfo">{children}</DialogContent>

        {action && (
          <ButtonGroup
            role="toolbar"
            fullWidth
            color="inherit"
            size="large"
            variant="contained"
            component={DialogActions}
          >
            {action}
          </ButtonGroup>
        )}
      </Dialog>
    ),
    (theme, { direction = 'row', fullScreen }) => ({
      paper: {
        ...(fullScreen && {
          overflow: 'hidden',
        }),

        '& > [role=contentinfo]': {
          display: 'flex',
          flexDirection: direction,
          gap: theme.spacing(2),
          paddingTop: theme.spacing(2),
          paddingBottom: theme.spacing(2),

          ...(fullScreen && {
            overflow: 'hidden auto',
          }),
        },
        '& > [role=toolbar]': {
          padding: 0,

          '& > *': {
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            margin: '0 !important',
          },
        },
      },
    }),
    { name: 'FlexDialog' }
  );
})();
