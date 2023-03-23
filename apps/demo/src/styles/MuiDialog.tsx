import ButtonGroup from '@mui/material/ButtonGroup';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { ReactNode } from 'react';
import { withStyles } from 'tss-react/mui';

import { IconTypograph } from './MuiTypograph';

interface FlexDialogProps extends Omit<DialogProps, 'PaperProps'> {
  icon?: ReactNode;
  title?: string;
  action?: ReactNode;
  children: ReactNode;
  direction?: 'row' | 'column';
}

export const FlexDialog = withStyles(
  ({
    icon,
    title,
    action,
    children,
    direction: _direction,
    ...props
  }: FlexDialogProps) => (
    <Dialog {...props} PaperProps={{ elevation: 0 }}>
      {(title || icon) && (
        <DialogTitle
          align="center"
          variant="h5"
          {...(icon && {
            component: IconTypograph,
            icon,
          })}
        >
          {title}
        </DialogTitle>
      )}

      <DialogContent role="contentinfo">{children}</DialogContent>

      {action && (
        <ButtonGroup
          role="toolbar"
          fullWidth
          variant="contained"
          size="large"
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
      },
      '& > [role=toolbar]': {
        padding: 0,

        '& > *': {
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
        },
      },
    },
  }),
  { name: 'FlexDialog' }
);
