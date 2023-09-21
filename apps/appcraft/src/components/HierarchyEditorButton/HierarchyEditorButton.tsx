import AddIcon from '@mui/icons-material/Add';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import Button from '@mui/material/Button';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import TextField from '@mui/material/TextField';
import { CraftsmanStyle } from '@appcraft/craftsman';
import { FormEvent, useState } from 'react';

import CommonButton from '../CommonButton';
import { useFixedT } from '~appcraft/hooks';
import type * as Types from './HierarchyEditorButton.types';

export default function HierarchyEditorButton({
  CommonButtonProps,
  btnVariant = 'icon',
  mode,
  data,
  onCancel,
  onConfirm,
}: Types.HierarchyEditorButtonProps) {
  const [at] = useFixedT('app');
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    onCancel?.();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    const formdata = new FormData(e.target as HTMLFormElement);

    e.preventDefault();

    await onConfirm({
      ...(data as Parameters<typeof onConfirm>[0]),
      name: formdata.get('name').toString(),
      description: formdata.get('description').toString(),
    });

    setOpen(false);
  };

  return (
    <>
      <CommonButton
        {...(CommonButtonProps as object)}
        btnVariant={btnVariant}
        text={at(`btn-${mode}-${data.type}`)}
        onClick={() => setOpen(true)}
        icon={
          mode === 'update' ? (
            <EditOutlinedIcon />
          ) : data.type === 'item' ? (
            <AddIcon />
          ) : (
            <BookmarkAddIcon />
          )
        }
      />

      <CraftsmanStyle.FlexDialog
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
      </CraftsmanStyle.FlexDialog>
    </>
  );
}
