import AddIcon from '@mui/icons-material/Add';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import { FormEventHandler, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import type { PaperProps } from '@mui/material/Paper';

import { FlexDialog } from '~appcraft/styles';
import { addHierarchy, updateHierarchy } from '~appcraft/services';
import { useFixedT } from '~appcraft/hooks';
import type * as Types from './HierarchyEditorButton.types';

export default function HierarchyEditorButton({
  mode,
  data,
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
      <Tooltip title={at(`btn-add-${data.type}`)}>
        <IconButton size="small" onClick={() => setOpen(true)}>
          {data.type === 'item' ? (
            <AddIcon fontSize="large" />
          ) : (
            <BookmarkAddIcon fontSize="large" />
          )}
        </IconButton>
      </Tooltip>

      <FlexDialog
        PaperProps={{ component: 'form', onSubmit: handleSubmit } as PaperProps}
        fullWidth
        direction="column"
        maxWidth="xs"
        title={at(`btn-add-${data.type}`)}
        open={open}
        action={
          <>
            <Button color="inherit" onClick={() => setOpen(false)}>
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
