import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import axios from 'axios';
import type { PaperProps } from '@mui/material/Paper';
import { FormEventHandler, useState } from 'react';

import type * as Types from './GroupEditor.types';
import { FlexDialog } from '~appcraft/styles';
import { useFixedT } from '~appcraft/hooks';

export default function GroupEditor({
  mode,
  type,
  data,
  onConfirm,
}: Types.GroupEditorProps) {
  const [at] = useFixedT('app');
  const [open, setOpen] = useState(false);

  const handleSubmit: FormEventHandler<HTMLDivElement> = async (e) => {
    e.preventDefault();

    const formdata = new FormData(e.target as HTMLFormElement);

    const { data: modified } = (await axios.post(
      '/api/data-forge/data-group/create',
      {
        ...data,
        mode,
        type,
        name: formdata.get('name').toString(),
        description: formdata.get('description').toString(),
      }
    )) as { data: Types.GroupData };

    onConfirm?.(modified);
  };

  return (
    <>
      <Tooltip title={at('btn-add-group')}>
        <IconButton onClick={() => setOpen(true)}>
          <BookmarkAddIcon fontSize="large" />
        </IconButton>
      </Tooltip>

      <FlexDialog
        PaperProps={{ component: 'form', onSubmit: handleSubmit } as PaperProps}
        fullWidth
        direction="column"
        maxWidth="xs"
        title={at('btn-add-group')}
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
          label={at('lbl-group-name')}
          defaultValue={data?.name}
        />

        <TextField
          multiline
          rows={3}
          maxRows={3}
          name="description"
          label={at('lbl-group-description')}
          defaultValue={data?.description}
        />
      </FlexDialog>
    </>
  );
}
