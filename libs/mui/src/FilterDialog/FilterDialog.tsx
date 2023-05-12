import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import CheckIcon from '@mui/icons-material/Check';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';
import ReplayIcon from '@mui/icons-material/Replay';
import TextField from '@mui/material/TextField';
import type { PaperProps } from '@mui/material/Paper';

import type { FilterDialogProps } from './FilterDialog.types';

export default function FilterDialog({
  values,
  onConfirm,
  onReset,
  ...props
}: FilterDialogProps) {
  return (
    <Dialog
      {...props}
      fullWidth
      maxWidth="xs"
      PaperProps={
        {
          sx: { borderRadius: (theme) => theme.spacing(2) },
          component: 'form',
          onSubmit: (e) => {
            e.stopPropagation();
          },
        } as PaperProps
      }
    >
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: (theme) => theme.spacing(1.5),
        }}
      ></DialogContent>

      <ButtonGroup
        fullWidth
        color="inherit"
        role="toolbar"
        variant="contained"
        component={DialogActions}
        sx={{
          padding: 0,

          '& > *': {
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            margin: '0 !important',
          },
        }}
      >
        <Button>
          <ReplayIcon />
        </Button>

        <Button type="submit" color="primary">
          <CheckIcon />
        </Button>
      </ButtonGroup>
    </Dialog>
  );
}
