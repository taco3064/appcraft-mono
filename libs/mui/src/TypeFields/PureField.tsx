import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import { NumericFormat, NumericFormatProps } from 'react-number-format';
import { forwardRef } from 'react';

import { useInputStyles, usePropValue } from '../InteractivedContext';
import type * as Types from './TypeFields.types';

const BoolInput = forwardRef<HTMLInputElement, Types.BoolInputProps>(
  ({ className: _cn, ...props }, ref) => (
    <FormControlLabel
      {...props}
      inputRef={ref}
      labelPlacement="start"
      control={<Switch color="primary" />}
      sx={(theme) => ({
        width: '100%',
        margin: theme.spacing(0, 2),

        '& > .MuiFormControlLabel-label': {
          width: '100%',
        },
      })}
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
  const [value, onChange] = usePropValue<unknown>(options.propName);

  switch (options.type) {
    case 'bool':
      return (
        <TextField
          {...styles}
          fullWidth
          required={options.required}
          InputProps={
            {
              inputComponent: BoolInput,
              inputProps: {
                label: options.propName,
                checked: Boolean(value),
                onChange: (e: { target: { checked: boolean } }) =>
                  onChange(e.target.checked),
              },
            } as object
          }
        />
      );

    case 'number':
      return (
        <TextField
          {...styles}
          fullWidth
          required={options.required}
          label={options.propName}
          InputProps={
            {
              inputComponent: NumberInput,
              inputProps: {
                defaultValue: value as number,
                onChange: (e: { target: { value: string } }) =>
                  onChange(
                    !e.target.value
                      ? undefined
                      : Number.parseFloat(e.target.value.replace(/,/g, ''))
                  ),
              },
            } as object
          }
        />
      );

    case 'oneOf':
      return (
        <TextField
          {...styles}
          fullWidth
          select
          required={options.required}
          label={options.propName}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
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
          {...styles}
          fullWidth
          required={options.required}
          label={options.propName}
          defaultValue={value || ''}
          onChange={(e) => onChange(e.target.value)}
        />
      );

    default:
      return null;
  }
}
