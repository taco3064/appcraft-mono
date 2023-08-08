import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import type { ComponentProps, ReactNode } from 'react';

export { TextField };

export type TextFieldProps = Pick<
  ComponentProps<typeof TextField>,
  | 'autoFocus'
  | 'children'
  | 'color'
  | 'defaultValue'
  | 'disabled'
  | 'error'
  | 'fullWidth'
  | 'helperText'
  | 'label'
  | 'margin'
  | 'maxRows'
  | 'minRows'
  | 'multiline'
  | 'name'
  | 'onChange'
  | 'placeholder'
  | 'required'
  | 'rows'
  | 'select'
  | 'size'
  | 'type'
  | 'value'
  | 'variant'
> & {
  InputLabelProps?: Pick<ComponentProps<typeof InputLabel>, 'shrink'>;

  InputProps?: {
    endAdornment?: ReactNode;
    startAdornment?: ReactNode;
  };

  SelectProps?: Pick<
    ComponentProps<typeof Select>,
    'defaultOpen' | 'displayEmpty' | 'multiple' | 'onClose' | 'onOpen' | 'open'
  >;
};
