import CheckIcon from '@mui/icons-material/Check';
import CleaningServicesOutlinedIcon from '@mui/icons-material/CleaningServicesOutlined';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
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

      <DialogActions>
        <IconButton>
          <CleaningServicesOutlinedIcon />
        </IconButton>

        <IconButton type="submit" color="primary">
          <CheckIcon />
        </IconButton>
      </DialogActions>
    </Popover>
  );
}
