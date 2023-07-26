import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { useQuery } from '@tanstack/react-query';

import { searchHierarchy } from '~appcraft/services';
import { useFixedT } from '~appcraft/hooks';
import type { WidgetSelectProps } from './WidgetSelect.types';

export default function WidgetSelect({
  disabled = false,
  exclude = [],
  label,
  value,
  onChange,
}: WidgetSelectProps) {
  const { data } = useQuery({
    refetchOnWindowFocus: false,
    queryFn: searchHierarchy,
    queryKey: ['widgets', { type: 'item' }],
  });

  const [wt] = useFixedT('widgets');
  const options = data?.filter(({ _id }) => !exclude.includes(_id)) || [];

  console.log(data, exclude);

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
    >
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
            }}
          />
        </MenuItem>
      ))}
    </TextField>
  );
}
