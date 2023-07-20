import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import { useQuery } from '@tanstack/react-query';

import { searchHierarchy } from '~appcraft/services';
import type { WrapTodoSelectProps } from './WrapTodoSelect.types';

export default function WidgetEditor({
  disabled = false,
  label,
  value,
  onChange,
}: WrapTodoSelectProps) {
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
      onChange={(e) => onChange(e.target.value)}
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
