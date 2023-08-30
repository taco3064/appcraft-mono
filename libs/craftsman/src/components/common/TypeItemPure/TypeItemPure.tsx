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
import type { ComponentProps } from 'react';

import BoolInput from '../BoolInput';
import NumberInput from '../NumberInput';
import { AdornmentTextField, TypeItemAction } from '../../../styles';
import { useLocalesContext } from '../../../contexts';
import { usePropValue } from '../../../hooks';
import type { TypeItemPureProps } from './TypeItemPure.types';

export default function TypeItemPure({
  action,
  disabled = false,
  label,
  options,
  propPath,
  selection,
}: TypeItemPureProps) {
  const ct = useLocalesContext();

  const [{ value, props, typeFile, typeName }, handlePure] = usePropValue(
    'pure',
    propPath
  );

  const baseProps: Omit<ComponentProps<typeof AdornmentTextField>, 'icon'> = {
    disabled,
    error: options.required && !value,
    fullWidth: true,
    helperText: options.required && !value ? ct('msg-required') : undefined,
    required: options.required,
    size: 'small',
    variant: 'outlined',
  };

  const override = handlePure.renderOverride?.('pure', {
    disabled,
    label,
    options,
    propPath,
    typeFile,
    typeName,
    props,
    value,
    onChange: handlePure.change,
  });

  return override === false ? null : (
    <ListItem data-category="pure">
      {selection}

      <ListItemText
        disableTypography
        primary={
          override || (
            <>
              {options.type === 'string' && (
                <AdornmentTextField
                  {...baseProps}
                  label={label}
                  icon={TitleIcon}
                  defaultValue={value || ''}
                  onChange={(e) => handlePure.change(e.target.value)}
                />
              )}

              {options.type === 'bool' && (
                <AdornmentTextField
                  {...baseProps}
                  icon={SwipeIcon}
                  InputProps={
                    {
                      inputComponent: BoolInput,
                      inputProps: {
                        label,
                        checked: Boolean(value),
                        onChange: (e: { target: { checked: boolean } }) =>
                          handlePure.change(e.target.checked),
                      },
                    } as object
                  }
                />
              )}

              {options.type === 'number' && (
                <AdornmentTextField
                  {...baseProps}
                  icon={DialpadIcon}
                  label={label}
                  InputProps={
                    {
                      inputComponent: NumberInput,
                      inputProps: {
                        defaultValue: value as number,
                        onChange: (e: { target: { value: string } }) =>
                          handlePure.change(
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
                  disabled={disabled}
                  value={value ? dayjs(value as string) : null}
                  onChange={(e) => handlePure.change(e?.toDate().toISOString())}
                  slots={{
                    textField: AdornmentTextField as typeof TextField,
                  }}
                  slotProps={{
                    textField: {
                      ...baseProps,
                      icon: CalendarMonthIcon,
                    } as object,
                  }}
                />
              )}

              {options.type === 'oneOf' && (
                <AdornmentTextField
                  {...baseProps}
                  SelectProps={{ displayEmpty: options.required }}
                  select
                  icon={MenuOpenIcon}
                  label={label}
                  value={value || ''}
                  onChange={(e) => handlePure.change(e.target.value)}
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
          )
        }
      />

      {action && <TypeItemAction>{action}</TypeItemAction>}
    </ListItem>
  );
}
