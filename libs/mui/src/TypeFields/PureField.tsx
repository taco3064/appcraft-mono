import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import Switch, { SwitchProps } from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import { ForwardRefExoticComponent, forwardRef } from 'react';
import { NumericFormat, NumericFormatProps } from 'react-number-format';
import type { InputBaseComponentProps } from '@mui/material/InputBase';

import type { PureFieldProps } from './TypeFields.types';

const BoolInput = forwardRef<
  HTMLInputElement,
  SwitchProps & {
    label: string;
  }
>(({ disabled, label, ...props }, ref) => (
  <FormControlLabel
    disabled={disabled}
    label={label}
    labelPlacement="start"
    control={<Switch {...props} inputRef={ref} />}
  />
));

const NumberInput = forwardRef<HTMLInputElement, NumericFormatProps>(
  ({ ...props }, ref) => (
    <NumericFormat {...props} thousandSeparator getInputRef={ref} />
  )
);

export default function PureField({ InputStyles, options }: PureFieldProps) {
  switch (options.type) {
    case 'bool':
      return (
        <TextField
          // {...InputStyles}
          fullWidth
          required={options.required}
          InputProps={
            {
              inputComponent: BoolInput,
              inputProps: {
                label: options.propName,
                defaultCheck: false,
                size: 'small',
              },
            } as object
          }
        />
      );

    case 'number':
      return (
        <TextField
          // {...InputStyles}
          fullWidth
          required={options.required}
          label={options.propName}
          InputProps={
            {
              inputComponent: NumberInput,
              inputProps: {},
            } as object
          }
        />
      );

    case 'oneOf':
      return (
        <TextField
          // {...InputStyles}
          fullWidth
          select
          required={options.required}
          label={options.propName}
          SelectProps={{ displayEmpty: options.required }}
        >
          {!options.required && <MenuItem value="">&nbsp;</MenuItem>}

          {options.options?.map((option) => (
            <MenuItem key={option.toString()} value={option as string}>
              {option.toString()}
            </MenuItem>
          ))}
        </TextField>
      );

    case 'string':
      return (
        <TextField
          // {...InputStyles}
          fullWidth
          required={options.required}
          label={options.propName}
        />
      );

    default:
      return null;
  }
}
