import SvgIcon from '@mui/material/SvgIcon';
import TextField from '@mui/material/TextField';
import type { ComponentProps } from 'react';
import type { FilledInputClasses } from '@mui/material/FilledInput';
import type { InputClasses } from '@mui/material/Input';
import type { OutlinedInputClasses } from '@mui/material/OutlinedInput';

export type TextFieldProps = ComponentProps<typeof TextField>;

export interface AdornmentTextFieldProps
  extends Omit<TextFieldProps, 'InputProps'> {
  InputProps?: Omit<TextFieldProps['InputProps'], 'classes' | 'startAdornment'>;

  classes?: Partial<FilledInputClasses & OutlinedInputClasses & InputClasses>;
  icon: typeof SvgIcon;
}
