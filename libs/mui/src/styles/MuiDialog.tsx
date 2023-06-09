import ButtonGroup from '@mui/material/ButtonGroup';
import CloseIcon from '@mui/icons-material/Close';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { FormEventHandler, ReactNode } from 'react';
import { withStyles } from 'tss-react/mui';

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
          <DialogTitle
            align="center"
            color="primary"
            fontWeight="bolder"
            variant="h5"
            style={{ position: 'relative', justifyContent: 'center' }}
            {...(icon && { component: Typography })}
          >
            {icon}
            {title}

            {onClose && (
              <IconButton
                size="small"
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
          </DialogTitle>
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
    (theme, { direction = 'row' }) => ({
      paper: {
        '& > [role=contentinfo]': {
          display: 'flex',
          flexDirection: direction,
          gap: theme.spacing(2),
          paddingTop: theme.spacing(2),
          paddingBottom: theme.spacing(2),
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
