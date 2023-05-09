import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import CheckIcon from '@mui/icons-material/Check';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import ReplayIcon from '@mui/icons-material/Replay';
import TextField from '@mui/material/TextField';
import type { PaperProps } from '@mui/material/Paper';

import type { FilterPopoverProps } from './FilterPopover.types';

export default function FilterPopover({
  values,
  onConfirm,
  onReset,
  ...props
}: FilterPopoverProps) {
  return (
    <Popover
      {...props}
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

      <Divider />

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
    </Popover>
  );
}
