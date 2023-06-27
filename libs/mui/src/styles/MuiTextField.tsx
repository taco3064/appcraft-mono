import InputAdornment from '@mui/material/InputAdornment';
import SvgIcon from '@mui/material/SvgIcon';
import TextField from '@mui/material/TextField';
import { withStyles } from 'tss-react/mui';
import type { ComponentProps } from 'react';
import type { FilledInputClasses } from '@mui/material/FilledInput';
import type { InputClasses } from '@mui/material/Input';
import type { OutlinedInputClasses } from '@mui/material/OutlinedInput';

export const AdornmentTextField = (() => {
  type TextFieldProps = ComponentProps<typeof TextField>;

  interface AdornmentTextFieldProps extends Omit<TextFieldProps, 'InputProps'> {
    InputProps?: Omit<
      TextFieldProps['InputProps'],
      'classes' | 'startAdornment'
    >;

    classes?: Partial<FilledInputClasses & OutlinedInputClasses & InputClasses>;
    icon: typeof SvgIcon;
  }

  return withStyles(
    ({
      InputProps,
      classes,
      icon: AdornmentIcon,
      ...props
    }: AdornmentTextFieldProps) => (
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
})();
