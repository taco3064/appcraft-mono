import ExtensionOutlinedIcon from '@mui/icons-material/ExtensionOutlined';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import LinkIcon from '@mui/icons-material/Link';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import { searchHierarchy } from '~appcraft/services';
import { useFixedT } from '~appcraft/hooks/common';
import { BaseOption } from '../index.types';
import type { PropsGroupPickerProps } from './PropsGroupPicker.types';

export default function PropsGroupPicker({
  layouts,
  value,
  onChange,
  onView,
  ...props
}: PropsGroupPickerProps) {
  const [at] = useFixedT('app');

  const targets = layouts.reduce((result, { template }) => {
    if (template?.id) {
      result.push(template.id);
    }

    return result;
  }, []);

  const { data } = useQuery({
    refetchOnWindowFocus: false,
    queryFn: searchHierarchy,
    queryKey: ['widgets', { type: 'item', targets }],
  });

  const options = useMemo(
    () =>
      data.map<BaseOption & { hierarchy: (typeof data)[number] }>(
        (hierarchy) => {
          const { _id, name, description } = hierarchy;
          const layout = layouts.find(({ template }) => template?.id === _id);

          return {
            value: layout.id,
            hierarchy,
            primary: name,
            secondary: description,
          };
        }
      ),
    [data, layouts]
  );

  return (
    <TextField
      {...props}
      key={value || ''}
      required
      select
      size="small"
      variant="outlined"
      error={!value}
      helperText={!value ? at('msg-required') : undefined}
      defaultValue={value || ''}
      onChange={(e) => onChange?.(e.target.value)}
      SelectProps={{
        displayEmpty: true,
        MenuProps: { PaperProps: { style: { maxWidth: 'min-content' } } },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            {(!value || !onView) && (
              <ExtensionOutlinedIcon fontSize="small" color="disabled" />
            )}

            {value && onView && (
              <IconButton
                size="small"
                onClick={() =>
                  onView(
                    options.find(({ value: id }) => id === value).hierarchy
                  )
                }
              >
                <LinkIcon fontSize="small" />
              </IconButton>
            )}
          </InputAdornment>
        ),
      }}
    >
      {options.map(({ value, primary, secondary }) => (
        <MenuItem key={value} value={value}>
          <ListItemText
            primary={primary}
            secondary={secondary}
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
