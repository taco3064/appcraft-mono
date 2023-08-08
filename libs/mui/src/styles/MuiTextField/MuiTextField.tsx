import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { withStyles } from 'tss-react/mui';

import type * as Types from './MuiTextField.types';

export const AdornmentTextField = withStyles(
  ({
    InputProps,
    classes,
    icon: AdornmentIcon,
    ...props
  }: Types.AdornmentTextFieldProps) => (
    <TextField
      {...props}
      InputProps={{
        ...InputProps,
        classes,
        startAdornment: (
          <InputAdornment role="definition" position="start">
            <AdornmentIcon fontSize="small" />
          </InputAdornment>
        ),
      }}
    />
  ),
  (theme, { color = 'primary' }) => ({
    root: {
      '& div[role="definition"] > svg': {
        color: theme.palette.action.disabled,
      },
      '&:hover div[role="definition"] > svg': {
        color: theme.palette.action.active,
      },
    },
    disabled: {
      '& div[role="definition"] > svg': {
        color: `${theme.palette.action.disabled} !important`,
      },
    },
    focused: {
      '& div[role="definition"] > svg': {
        color: `${theme.palette[color].main} !important`,
      },
    },
  }),
  { name: 'AdornmentTextField' }
);
