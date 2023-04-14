import AddIcon from '@mui/icons-material/Add';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import Button from '@mui/material/Button';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import TextField from '@mui/material/TextField';
import { FormEventHandler, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import type { PaperProps } from '@mui/material/Paper';

import { CommonButton, CommonButtonProps } from '../common';
import { FlexDialog } from '~appcraft/styles';
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
  const [at] = useFixedT('app');
  const [open, setOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: mode === 'add' ? addHierarchy : updateHierarchy,
    onSuccess: (modified) => {
      onConfirm?.(modified);
      setOpen(false);
    },
  });

  const handleSubmit: FormEventHandler<HTMLDivElement> = async (e) => {
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
        PaperProps={{ component: 'form', onSubmit: handleSubmit } as PaperProps}
        fullWidth
        direction="column"
        maxWidth="xs"
        title={at(`btn-${mode}-${data.type}`)}
        open={open}
        action={
          <>
            <Button
              color="inherit"
              onClick={() => {
                setOpen(false);
                onCancel?.();
              }}
            >
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
