import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import StorageIcon from '@mui/icons-material/Storage';
import TextField from '@mui/material/TextField';
import { useQuery } from '@tanstack/react-query';
import type { MainWidget } from '@appcraft/types';

import { findConfig } from '~appcraft/services';
import { useFixedT } from '~appcraft/contexts';
import type * as Types from './PropPathPicker.types';

export default function PropPathPicker({
  template,
  value,
  onChange,
  ...props
}: Types.PropPathPickerProps) {
  const [at, ct] = useFixedT('app', 'appcraft');

  const { data: widget } = useQuery({
    enabled: Boolean(template),
    queryKey: [template],
    queryFn: findConfig<MainWidget>,
    refetchOnWindowFocus: false,
  });

  const options = Object.entries(widget?.content.state || {}).reduce<
    Types.PropPathOption[]
  >((result, [category, states]) => {
    Object.entries(states).forEach(([path, { alias, type, description }]) => {
      if (type === 'public') {
        result.push({
          value: path,
          primary: alias,
          secondary: `${ct(`ttl-state-${category}`)} - ${
            description || path.replace(/.*nodes\./g, '')
          }`,
        });
      }
    });

    return result;
  }, []);

  return (
    <TextField
      {...props}
      SelectProps={{ displayEmpty: true }}
      fullWidth
      required
      select
      size="small"
      variant="outlined"
      error={!value}
      helperText={!value ? at('msg-required') : undefined}
      disabled={!widget || !options.length}
      defaultValue={value || ''}
      onChange={(e) => onChange?.(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <StorageIcon fontSize="small" color="disabled" />
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