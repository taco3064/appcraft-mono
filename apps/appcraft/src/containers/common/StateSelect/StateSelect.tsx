import InputAdornment from '@mui/material/InputAdornment';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import ModeStandbyIcon from '@mui/icons-material/ModeStandby';
import TextField from '@mui/material/TextField';

import { useFixedT } from '~appcraft/hooks';
import type { StateSelectProps } from './StateSelect.types';

export default function StateSelect({
  disabled = false,
  label,
  options,
  value,
  onChange,
}: StateSelectProps) {
  const [wt] = useFixedT('widgets');

  return (
    <TextField
      {...{ disabled, label, value }}
      fullWidth
      required
      select
      size="small"
      variant="outlined"
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
            <ModeStandbyIcon fontSize="small" color="disabled" />
          </InputAdornment>
        ),
      }}
    >
      {options.map(({ primary, secondary, value }) => (
        <MenuItem
          key={value}
          value={value}
          sx={(theme) => ({ paddingLeft: theme.spacing(2) })}
        >
          <ListItemText
            {...{ primary, secondary }}
            primaryTypographyProps={{
              variant: 'subtitle1',
              color: 'text.primary',
              lineHeight: 1.5,
              style: { margin: 0 },
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
