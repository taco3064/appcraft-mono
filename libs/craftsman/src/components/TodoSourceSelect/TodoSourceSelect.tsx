import MenuItem from '@mui/material/MenuItem';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

import * as Style from '../../styles';
import { useLocalesContext } from '../../contexts';
import type { TodoSourceSelectProps } from './TodoSourceSelect.types';

export default function TodoSourceSelect({
  disabled = false,
  label,
  options,
  value,
  onChange,
}: TodoSourceSelectProps) {
  const error = Boolean(!value);
  const ct = useLocalesContext();

  return (
    <Style.AdornmentTextField
      {...{ disabled, error, label, value }}
      fullWidth
      required
      select
      size="small"
      variant="outlined"
      helperText={error ? ct('msg-required') : undefined}
      icon={MenuOpenIcon}
      onChange={(e) => onChange(e.target.value)}
    >
      {options?.map((option) => (
        <MenuItem key={option.toString()} value={option as string}>
          {option.toString()}
        </MenuItem>
      ))}
    </Style.AdornmentTextField>
  );
}
