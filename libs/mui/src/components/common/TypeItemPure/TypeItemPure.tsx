import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DialpadIcon from '@mui/icons-material/Dialpad';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import SwipeIcon from '@mui/icons-material/Swipe';
import TextField from '@mui/material/TextField';
import TitleIcon from '@mui/icons-material/Title';
import dayjs from 'dayjs';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';

import * as Common from '..';
import * as Hooks from '../../../hooks';
import { AdornmentTextField, TypeItemAction } from '../../../styles';
import type { TypeItemPureProps } from './TypeItemPure.types';

export default function TypeItemPure({
  action,
  description,
  disabled = false,
  label,
  options,
  propPath,
  selection,
}: TypeItemPureProps) {
  const [value, onChange] = Hooks.usePropValue(propPath);

  return (
    <ListItem>
      {selection}

      <ListItemText
        disableTypography
        secondary={description}
        primary={
          <>
            {options.type === 'string' && (
              <AdornmentTextField
                fullWidth
                size="small"
                variant="outlined"
                icon={TitleIcon}
                disabled={disabled}
                required={options.required}
                label={label}
                defaultValue={value || ''}
                onChange={(e) => onChange(e.target.value)}
              />
            )}

            {options.type === 'bool' && (
              <AdornmentTextField
                fullWidth
                size="small"
                variant="outlined"
                disabled={disabled}
                required={options.required}
                icon={SwipeIcon}
                InputProps={
                  {
                    inputComponent: Common.BoolInput,
                    inputProps: {
                      label,
                      checked: Boolean(value),
                      onChange: (e: { target: { checked: boolean } }) =>
                        onChange(e.target.checked),
                    },
                  } as object
                }
              />
            )}

            {options.type === 'number' && (
              <AdornmentTextField
                fullWidth
                size="small"
                variant="outlined"
                disabled={disabled}
                required={options.required}
                icon={DialpadIcon}
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
                slots={{
                  textField: AdornmentTextField as typeof TextField,
                }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    required: options.required,
                    size: 'small',
                    variant: 'outlined',
                    icon: CalendarMonthIcon,
                  } as object,
                }}
              />
            )}

            {options.type === 'oneOf' && (
              <AdornmentTextField
                SelectProps={{ displayEmpty: options.required }}
                select
                fullWidth
                size="small"
                variant="outlined"
                required={options.required}
                icon={MenuOpenIcon}
                label={label}
                value={value || ''}
                onChange={(e) => onChange(e.target.value)}
                disabled={
                  disabled || Boolean(options.options?.length === 1 && value)
                }
              >
                {!options.required && <MenuItem value="">&nbsp;</MenuItem>}

                {options.options?.map((option) => (
                  <MenuItem key={option.toString()} value={option as string}>
                    {option.toString()}
                  </MenuItem>
                ))}
              </AdornmentTextField>
            )}
          </>
        }
      />

      {action && <TypeItemAction>{action}</TypeItemAction>}
    </ListItem>
  );
}
