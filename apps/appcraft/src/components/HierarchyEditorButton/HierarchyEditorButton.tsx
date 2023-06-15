import AddIcon from '@mui/icons-material/Add';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import Button from '@mui/material/Button';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import TextField from '@mui/material/TextField';
import { FlexDialog } from '@appcraft/mui';
import { FormEvent, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';

import { CommonButton, CommonButtonProps } from '../common';
import { addHierarchy, updateHierarchy } from '~appcraft/services';
import { useFixedT } from '~appcraft/hooks';
import type * as Types from './HierarchyEditorButton.types';

export default function HierarchyEditorButton({
  CommonButtonProps,
  IconProps,

  btnVariant = 'icon',
  mode,
  data,

  onCancel,
  onConfirm,
}: Types.HierarchyEditorButtonProps) {
  const { enqueueSnackbar } = useSnackbar();
  const [at] = useFixedT('app');
  const [open, setOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: mode === 'add' ? addHierarchy : updateHierarchy,
    onSuccess: (modified) => {
      onConfirm?.(modified);
      setOpen(false);
      enqueueSnackbar(at(`txt-succeed-${mode}`), { variant: 'success' });
    },
  });

  const handleClose = () => {
    setOpen(false);
    onCancel?.();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    const formdata = new FormData(e.target as HTMLFormElement);

    e.preventDefault();

    mutation.mutate({
      ...data,
      name: formdata.get('name').toString(),
      description: formdata.get('description').toString(),
    });
  };

  return (
    <>
      <CommonButton
        {...({
          ...CommonButtonProps,
          IconProps,
          btnVariant,
        } as CommonButtonProps)}
        text={at(`btn-${mode}-${data.type}`)}
        onClick={() => setOpen(true)}
        icon={
          mode === 'update'
            ? EditOutlinedIcon
            : data.type === 'item'
            ? AddIcon
            : BookmarkAddIcon
        }
      />

      <FlexDialog
        fullWidth
        direction="column"
        maxWidth="xs"
        title={at(`btn-${mode}-${data.type}`)}
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
          name="name"
          inputProps={{ maxLength: 50 }}
          label={at(`lbl-${data.type}-name`)}
          defaultValue={data.name}
        />

        <TextField
          multiline
          rows={3}
          maxRows={3}
          name="description"
          label={at('lbl-description')}
          defaultValue={data.description}
        />
      </FlexDialog>
    </>
  );
}
