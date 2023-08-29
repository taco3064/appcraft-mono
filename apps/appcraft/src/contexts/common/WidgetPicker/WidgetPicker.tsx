import ExtensionOutlinedIcon from '@mui/icons-material/ExtensionOutlined';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import LinkIcon from '@mui/icons-material/Link';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { useQuery } from '@tanstack/react-query';

import { searchHierarchy } from '~appcraft/services';
import type { WidgetPickerProps } from './WidgetPicker.types';

export default function WidgetPicker({
  exclude = [],
  targets,
  value,
  onChange,
  onView,
  ...props
}: WidgetPickerProps) {
  const { data } = useQuery({
    refetchOnWindowFocus: false,
    queryFn: searchHierarchy,
    queryKey: ['widgets', { type: 'item', targets }],
  });

  const options = data?.filter(({ _id }) => !exclude.includes(_id)) || [];

  return (
    <TextField
      {...props}
      SelectProps={{
        displayEmpty: true,
        MenuProps: { PaperProps: { style: { maxWidth: 'min-content' } } },
      }}
      select
      defaultValue={value || ''}
      onChange={(e) => onChange?.(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            {(!value || !onView) && (
              <ExtensionOutlinedIcon fontSize="small" color="disabled" />
            )}

            {value && onView && (
              <IconButton
                size="small"
                onClick={() => onView(data.find(({ _id }) => _id === value))}
              >
                <LinkIcon fontSize="small" />
              </IconButton>
            )}
          </InputAdornment>
        ),
      }}
    >
      <MenuItem value="">&nbsp;</MenuItem>

      {options.map(({ _id, name, description }) => (
        <MenuItem key={_id} value={_id}>
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
              whiteSpace: 'pre-line',
              display: '-webkit-box',
              overflow: 'hidden',
              style: {
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 2,
              },
            }}
          />
        </MenuItem>
      ))}
    </TextField>
  );
}
