import InputAdornment from '@mui/material/InputAdornment';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import TextField from '@mui/material/TextField';

import { useFixedT, usePathOptions } from '~appcraft/hooks';
import type * as Types from './StatePathPicker.types';

export default function StatePathPicker({
  disabled = false,
  label,
  states,
  value,
  onChange,
}: Types.StatePathPickerProps) {
  const [wt] = useFixedT('widgets');
  const options = usePathOptions(states);

  return (
    <TextField
      {...{ disabled, label, value }}
      fullWidth
      required
      select
      size="small"
      variant="outlined"
      disabled={!options.length}
      error={!options.length || !value}
      onChange={(e) => onChange(e.target.value)}
      helperText={
        !options.length
          ? wt('msg-no-options')
          : !value
          ? wt('msg-required')
          : undefined
      }
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SaveAltIcon fontSize="small" color="disabled" />
          </InputAdornment>
        ),
      }}
    >
      {options.map(({ primary, secondary, value }) => (
        <MenuItem key={value} value={value}>
          <ListItemText
            {...{ primary, secondary }}
            primaryTypographyProps={{
              variant: 'subtitle1',
              color: 'text.primary',
            }}
            secondaryTypographyProps={{
              variant: 'caption',
              color: 'text.secondary',
            }}
          />
        </MenuItem>
      ))}
    </TextField>
  );
}
