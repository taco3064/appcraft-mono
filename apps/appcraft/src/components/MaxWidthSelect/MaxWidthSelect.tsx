import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';

import { useFixedT } from '~appcraft/hooks';
import type { MaxWidthSelectProps } from './MaxWidthSelect.types';

export default function MaxWidthSelect({
  breakpoint,
  label,
  ...props
}: MaxWidthSelectProps) {
  const theme = useTheme();
  const [pt] = useFixedT('pages');
  const breakpoints = theme.breakpoints.keys;

  return (
    <TextField {...props} select label={label || pt('lbl-max-width')}>
      {breakpoints.slice(0, breakpoints.indexOf(breakpoint) + 1).map((key) => (
        <MenuItem key={key} value={key}>
          {pt(`lbl-${key}`)}
        </MenuItem>
      ))}
    </TextField>
  );
}
