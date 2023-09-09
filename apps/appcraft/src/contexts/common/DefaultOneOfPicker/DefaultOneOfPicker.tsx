import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import TextField from '@mui/material/TextField';

import { useFixedT } from '../useApp';
import type { DefaultOneOfPickerProps } from './DefaultOneOfPicker.types';

export default function DefaultOneOfPicker({
  disabled,
  label,
  options,
  value,
  onChange,
}: DefaultOneOfPickerProps) {
  const [wt] = useFixedT('widgets');
  const error = options.required && !value;

  return (
    <TextField
      {...{ disabled, error, label }}
      fullWidth
      select
      size="small"
      variant="outlined"
      helperText={error ? wt('msg-required') : undefined}
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <MenuOpenIcon fontSize="small" color="disabled" />
          </InputAdornment>
        ),
      }}
    >
      {!options.required && <MenuItem value="">&nbsp;</MenuItem>}

      {options.options?.map((option) => (
        <MenuItem key={option.toString()} value={option as string}>
          {option.toString()}
        </MenuItem>
      ))}
    </TextField>
  );
}
