import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import TextField from '@mui/material/TextField';
import _omit from 'lodash/omit';
import { useQuery } from '@tanstack/react-query';
import type { MainWidget } from '@appcraft/types';

import { findConfig } from '~appcraft/services';
import { useFixedT } from '../useApp';
import { usePathOptions } from '../usePathOptions';
import type * as Types from './PropPathPicker.types';

export default function PropPathPicker({
  disabled = false,
  label,
  template,
  value,
  onChange,
}: Types.PropPathPickerProps) {
  const [wt] = useFixedT('widgets');

  const { data: widget } = useQuery({
    enabled: Boolean(template),
    queryKey: [template],
    queryFn: findConfig<MainWidget>,
    refetchOnWindowFocus: false,
  });

  const options = usePathOptions(_omit(widget?.content.state, ['todos']));

  return (
    <TextField
      {...{ disabled, label, value }}
      fullWidth
      required
      select
      size="small"
      variant="outlined"
      disabled={!widget || !options.length}
      error={!value}
      onChange={(e) => onChange?.(e.target.value)}
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
      <MenuItem value="">&nbsp;</MenuItem>

      {options.map(({ value, primary, secondary }) => (
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
