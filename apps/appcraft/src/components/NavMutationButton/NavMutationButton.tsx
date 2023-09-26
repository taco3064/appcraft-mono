import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
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
      subTitle: formdata.get('subTitle').toString(),
      pathname: `/${formdata.get('pathname').toString()}`,
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
