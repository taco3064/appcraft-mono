import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import LinkIcon from '@mui/icons-material/Link';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { useQuery } from '@tanstack/react-query';

import { searchHierarchy } from '~appcraft/services';
import { useFixedT } from '~appcraft/hooks';
import type { TodoWrapperPickerProps } from './TodoWrapperPicker.types';

export default function TodoWrapperPicker({
  disabled = false,
  label,
  value,
  onChange,
  onView,
}: TodoWrapperPickerProps) {
  const [at, wt] = useFixedT('app', 'widgets');

  const { data: options } = useQuery({
    refetchOnWindowFocus: false,
    queryFn: searchHierarchy,
    queryKey: ['todos', { type: 'item' }],
  });

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
          ? at('msg-required')
          : undefined
      }
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            {(!value || !onView) && (
              <Inventory2OutlinedIcon fontSize="small" color="disabled" />
            )}

            {value && onView && (
              <IconButton
                size="small"
                onClick={() => onView(options.find(({ _id }) => _id === value))}
              >
                <LinkIcon fontSize="small" />
              </IconButton>
            )}
          </InputAdornment>
        ),
      }}
    >
      {options?.map(({ _id, name, description }) => (
        <MenuItem
          key={_id}
          value={_id}
          sx={(theme) => ({ paddingLeft: theme.spacing(2) })}
        >
          <ListItemText
            primary={name}
            secondary={description}
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
