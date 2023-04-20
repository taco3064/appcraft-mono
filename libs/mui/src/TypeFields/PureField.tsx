import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import { NumericFormat, NumericFormatProps } from 'react-number-format';
import { forwardRef } from 'react';

import { useInputStyles, usePropValue } from '../InteractivedContext';
import type * as Types from './TypeFields.types';

const BoolInput = forwardRef<HTMLInputElement, Types.BoolInputProps>(
  ({ disabled, label, ...props }, ref) => (
    <FormControlLabel
      disabled={disabled}
      label={label}
      labelPlacement="start"
      control={<Switch {...props} inputRef={ref} />}
    />
  )
);

const NumberInput = forwardRef<HTMLInputElement, NumericFormatProps>(
  (props, ref) => (
    <NumericFormat {...props} thousandSeparator getInputRef={ref} />
  )
);

export default function PureField({ options }: Types.PureFieldProps) {
  const styles = useInputStyles();
  const [value] = usePropValue<string>(options.propName);

  console.log(value);

  switch (options.type) {
    case 'bool':
      return (
        <TextField
          fullWidth
          {...styles}
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
          fullWidth
          {...styles}
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
          fullWidth
          {...styles}
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
          fullWidth
          {...styles}
          required={options.required}
          label={options.propName}
        />
      );

    default:
      return null;
  }
}
