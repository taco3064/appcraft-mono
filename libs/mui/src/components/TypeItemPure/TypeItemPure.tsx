import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DialpadIcon from '@mui/icons-material/Dialpad';
import InputAdornment from '@mui/material/InputAdornment';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SwipeIcon from '@mui/icons-material/Swipe';
import TextField from '@mui/material/TextField';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import dayjs from 'dayjs';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';

import * as Common from '../common';
import * as Hooks from '../../hooks';
import { TypeItemAction } from '../../styles';
import type { TypeItemPureProps } from './TypeItemPure.types';

export default function TypeItemPure({
  action,
  disabled = false,
  label,
  options,
  propPath,
  selection,
}: TypeItemPureProps) {
  const { value, onChange } = Hooks.usePropValue(propPath);

  return (
    <ListItem>
      {selection}

      <ListItemText
        disableTypography
        primary={
          <>
            {options.type === 'string' && (
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                disabled={disabled}
                required={options.required}
                label={label}
                defaultValue={value || ''}
                onChange={(e) => onChange(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <TextFieldsIcon color="disabled" />
                    </InputAdornment>
                  ),
                }}
              />
            )}

            {options.type === 'bool' && (
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                disabled={disabled}
                required={options.required}
                InputProps={
                  {
                    inputComponent: Common.BoolInput,
                    inputProps: {
                      label,
                      checked: Boolean(value),
                      onChange: (e: { target: { checked: boolean } }) =>
                        onChange(e.target.checked),
                    },
                    startAdornment: (
                      <InputAdornment position="start">
                        <SwipeIcon color="disabled" />
                      </InputAdornment>
                    ),
                  } as object
                }
              />
            )}

            {options.type === 'number' && (
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                disabled={disabled}
                required={options.required}
                label={label}
                InputProps={
                  {
                    inputComponent: Common.NumberInput,
                    inputProps: {
                      defaultValue: value as number,
                      onChange: (e: { target: { value: string } }) =>
                        onChange(
                          !e.target.value
                            ? undefined
                            : Number.parseFloat(
                                e.target.value.replace(/,/g, '')
                              )
                        ),
                    },
                    startAdornment: (
                      <InputAdornment position="start">
                        <DialpadIcon color="disabled" />
                      </InputAdornment>
                    ),
                  } as object
                }
              />
            )}

            {options.type === 'instanceOf' && options.options === 'Date' && (
              <MobileDateTimePicker
                ampm={false}
                label={label}
                value={value ? dayjs(value as string) : null}
                onChange={(e) => onChange(e?.toDate().toISOString())}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    required: options.required,
                    size: 'small',
                    variant: 'outlined',
                    InputProps: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <CalendarMonthIcon color="disabled" />
                        </InputAdornment>
                      ),
                    },
                  },
                }}
              />
            )}

            {options.type === 'oneOf' && (
              <TextField
                SelectProps={{ displayEmpty: options.required }}
                select
                fullWidth
                size="small"
                variant="outlined"
                required={options.required}
                label={label}
                value={value || ''}
                onChange={(e) => onChange(e.target.value)}
                disabled={
                  disabled || Boolean(options.options?.length === 1 && value)
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MenuIcon color="disabled" />
                    </InputAdornment>
                  ),
                }}
              >
                {!options.required && <MenuItem value="">&nbsp;</MenuItem>}

                {options.options?.map((option) => (
                  <MenuItem key={option.toString()} value={option as string}>
                    {option.toString()}
                  </MenuItem>
                ))}
              </TextField>
            )}
          </>
        }
      />

      {action && (
        <TypeItemAction onClick={(e) => e.stopPropagation()}>
          {action}
        </TypeItemAction>
      )}
    </ListItem>
  );
}
