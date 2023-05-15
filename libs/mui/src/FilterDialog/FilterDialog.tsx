import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
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

import type * as Types from './FilterDialog.types';

const filter = createFilterOptions<Types.NameOption>();
const typeOptions = Object.keys(PropType).filter((key) => !/^\d+$/.test(key));

export default function FilterDialog({
  values,
  onClose,
  onConfirm,
  onReset,
  ...props
}: Types.FilterDialogProps) {
  const [types, setTypes] = useState(values.types);
  const [names, setNames] = useState(values.names);

  return (
    <Dialog
      {...props}
      fullWidth
      maxWidth="xs"
      onClose={onClose}
      PaperProps={
        {
          component: 'form',
          onSubmit: (e) => {
            e.preventDefault();

            onConfirm({ types, names });
            onClose();
          },
        } as PaperProps
      }
    >
      <DialogContent style={{ flexDirection: 'column' }}>
        <Autocomplete
          autoHighlight
          fullWidth
          multiple
          options={typeOptions}
          value={types}
          onChange={(_e, newValue) =>
            setTypes(newValue as FilterOptions['types'])
          }
          renderInput={(params) => (
            <TextField
              {...params}
              variant="filled"
              label="Types"
              InputProps={{
                ...params.InputProps,
                sx: (theme) => ({
                  '& input': {
                    marginTop: theme.spacing(1),
                  },
                }),
              }}
            />
          )}
          renderTags={(tagValue, getTagProps) => (
            <Box
              sx={(theme) => ({
                display: 'flex',
                flexWrap: 'wrap',
                gap: theme.spacing(0.5),
                marginTop: theme.spacing(1),
              })}
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
        />

        <Autocomplete
          clearOnBlur
          freeSolo
          fullWidth
          handleHomeEndKeys
          multiple
          selectOnFocus
          options={names as Types.NameOption[]}
          value={names}
          getOptionLabel={(option) =>
            typeof option === 'string' ? option : option.text
          }
          onChange={(_e, newValue) =>
            setNames(
              newValue.map((option) =>
                typeof option === 'string' ? option : option.name
              )
            )
          }
          renderInput={(params) => (
            <TextField {...params} variant="filled" label="Names" />
          )}
          renderTags={(_tagValue, getTagProps) => (
            <Box
              sx={(theme) => ({
                display: 'flex',
                flexWrap: 'wrap',
                gap: theme.spacing(0.5),
                marginTop: theme.spacing(1),
              })}
            >
              {names.map((name, index) => (
                <Chip
                  {...getTagProps({ index })}
                  color="secondary"
                  variant="outlined"
                  label={name}
                />
              ))}
            </Box>
          )}
          filterOptions={(options, params) => {
            const inputValue = params.inputValue.trim();
            const filtered = filter(options, params);

            if (
              inputValue &&
              !filtered.find((option) =>
                typeof option === 'string'
                  ? option === inputValue
                  : option.name === inputValue
              )
            ) {
              filtered.push({
                text: `Add "${inputValue}"`,
                name: inputValue,
              });
            }

            return filtered;
          }}
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
        <Button startIcon={<ReplayIcon />} onClick={onReset}>
          Reset
        </Button>

        <Button type="submit" color="primary" startIcon={<CheckIcon />}>
          Confirm
        </Button>
      </ButtonGroup>
    </Dialog>
  );
}
