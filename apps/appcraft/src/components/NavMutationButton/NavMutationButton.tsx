import AddIcon from '@mui/icons-material/Add';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Icon from '@mui/material/Icon';
import InputAdornment from '@mui/material/InputAdornment';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { CraftsmanStyle } from '@appcraft/craftsman';
import { useState } from 'react';
import type { FormEvent } from 'react';

import CommonButton from '../CommonButton';
import { useFixedT } from '~appcraft/hooks';
import type * as Types from './NavMutationButton.types';
import { List } from '@mui/material';

const PATTERN = '^[a-zA-Z0-9][a-zA-Z0-9_\\-]*[a-zA-Z0-9]$';

export default function NavMutationButton({
  CommonButtonProps,
  btnVariant = 'icon',
  data,
  mode,
  options,
  onCancel,
  onConfirm,
}: Types.NavMutationButtonProps) {
  const [at, wt] = useFixedT('app', 'websites');
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    onCancel?.();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    const formdata = new FormData(e.target as HTMLFormElement);

    e.preventDefault();
    setOpen(false);

    onConfirm({
      ...(data as Parameters<typeof onConfirm>[0]),
      pageid: formdata.get('pageid').toString(),
      pathname: `/${formdata.get('pathname').toString()}`,
      subTitle: formdata.get('subTitle').toString(),
      icon: formdata
        .get('icon')
        .toString()
        .replace(/([A-Z])/g, '_$1')
        .toLowerCase()
        .replace(/^_/, ''),
    });
  };

  return (
    <>
      <CommonButton
        {...(CommonButtonProps as object)}
        btnVariant={btnVariant}
        text={wt(`btn-page-${mode}`)}
        onClick={() => setOpen(true)}
        icon={mode === 'update' ? <EditOutlinedIcon /> : <AddIcon />}
      />

      <CraftsmanStyle.FlexDialog
        fullWidth
        direction="column"
        maxWidth="xs"
        title={wt(`btn-page-${mode}`)}
        open={open}
        onClose={handleClose}
        onSubmit={handleSubmit}
        action={
          <>
            <Button color="inherit" onClick={handleClose}>
              {at('btn-cancel')}
            </Button>

            <Button type="submit" color="primary">
              {at('btn-confirm')}
            </Button>
          </>
        }
      >
        <TextField
          autoFocus
          required
          name="subTitle"
          inputProps={{ maxLength: 20 }}
          label={wt('lbl-sub-title')}
          defaultValue={data.subTitle}
        />

        <Autocomplete
          defaultValue={data.icon}
          options={__WEBPACK_DEFINE__.MUI_ICONS}
          filterOptions={(options, { inputValue }) => {
            const result: string[] = [];

            for (const option of options) {
              if (option.includes(inputValue.toLowerCase())) {
                result.push(option);
              }

              if (result.length === 20) {
                break;
              }
            }

            return result;
          }}
          getOptionLabel={(option) =>
            option
              .replace(/_([a-z])/g, (match, p1) => p1.toUpperCase())
              .replace(/^[a-z]/, (match) => match.toUpperCase())
          }
          renderInput={({ InputProps, inputProps, ...params }) => (
            <TextField
              {...params}
              name="icon"
              label={wt('lbl-nav-icon')}
              inputProps={inputProps}
              InputProps={{
                ...InputProps,
                startAdornment:
                  !inputProps.value ||
                  typeof inputProps.value !== 'string' ? null : (
                    <InputAdornment position="start">
                      <Icon
                        fontSize="small"
                        sx={(theme) => ({
                          transform: `translateY(${theme.spacing(-1)})`,
                        })}
                      >
                        {inputProps.value
                          .replace(/([A-Z])/g, '_$1')
                          .toLowerCase()
                          .replace(/^_/, '')}
                      </Icon>
                    </InputAdornment>
                  ),
              }}
            />
          )}
          renderOption={(props, option) => (
            <MenuItem {...props}>
              <CraftsmanStyle.GapTypography variant="body1">
                <Icon color="action">{option}</Icon>
                {option
                  .replace(/_([a-z])/g, (match, p1) => p1.toUpperCase())
                  .replace(/^[a-z]/, (match) => match.toUpperCase())}
              </CraftsmanStyle.GapTypography>
            </MenuItem>
          )}
        />

        <TextField
          required
          select
          name="pageid"
          label={wt('lbl-page')}
          defaultValue={data.pageid}
        >
          {options.map(({ value, primary, secondary }) => (
            <MenuItem key={value} value={value}>
              <ListItemText
                {...{ primary, secondary }}
                primaryTypographyProps={{
                  variant: 'subtitle1',
                  color: 'text.primary',
                }}
                secondaryTypographyProps={{
                  variant: 'caption',
                  color: 'text.secondary',
                }}
              />
            </MenuItem>
          ))}
        </TextField>

        <TextField
          required
          name="pathname"
          label={wt('lbl-pathname')}
          helperText={wt('msg-pathname-helper')}
          defaultValue={data.pathname?.replace(/^\//, '')}
          InputProps={{
            startAdornment: <InputAdornment position="start">/</InputAdornment>,
            inputProps: { pattern: PATTERN },
          }}
        />
      </CraftsmanStyle.FlexDialog>
    </>
  );
}
