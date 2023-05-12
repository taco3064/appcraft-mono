import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import CheckIcon from '@mui/icons-material/Check';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import ReplayIcon from '@mui/icons-material/Replay';
import TextField from '@mui/material/TextField';
import { FilterOptions, PropType } from '@appcraft/types';
import { useState } from 'react';
import type { PaperProps } from '@mui/material/Paper';

import type { FilterDialogProps } from './FilterDialog.types';

const typeOptions = Object.keys(PropType).filter((key) => !/^\d+$/.test(key));

export default function FilterDialog({
  values,
  onConfirm,
  onReset,
  ...props
}: FilterDialogProps) {
  const [types, setTypes] = useState<FilterOptions['types']>(values.types);

  console.log(types);

  return (
    <Dialog
      {...props}
      fullWidth
      maxWidth="xs"
      PaperProps={
        {
          component: 'form',
          onSubmit: (e) => {
            e.preventDefault();
          },
        } as PaperProps
      }
    >
      <DialogContent style={{ flexDirection: 'column' }}>
        <Autocomplete
          fullWidth
          multiple
          value={types}
          onChange={(_e, newValue) =>
            setTypes(newValue as FilterOptions['types'])
          }
          options={typeOptions}
          renderTags={(tagValue, getTagProps) => (
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 0.5,
                marginTop: (theme) => theme.spacing(1),
              }}
            >
              {tagValue.map((option, index) => (
                <Chip
                  {...getTagProps({ index })}
                  label={option}
                  color="secondary"
                  variant="outlined"
                />
              ))}
            </Box>
          )}
          renderInput={(params) => (
            <TextField {...params} variant="filled" label="Types" />
          )}
        />
      </DialogContent>

      <ButtonGroup
        fullWidth
        color="inherit"
        size="large"
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
        <Button onClick={onReset}>
          <ReplayIcon />
        </Button>

        <Button type="submit" color="primary">
          <CheckIcon />
        </Button>
      </ButtonGroup>
    </Dialog>
  );
}
