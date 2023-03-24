import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';

import type * as Types from './NewGroup.types';
import { FlexDialog } from '~demo/styles';
import { useFixedT } from '~demo/hooks';

export default function NewGroup({}: Types.NewGroupProps) {
  const [at] = useFixedT('app');
  const [open, setOpen] = useState(false);

  return (
    <>
      <Tooltip title={at('btn-add-group')}>
        <IconButton onClick={() => setOpen(true)}>
          <BookmarkAddIcon fontSize="large" />
        </IconButton>
      </Tooltip>

      <FlexDialog
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

            <Button color="primary" onClick={() => setOpen(false)}>
              {at('btn-confirm')}
            </Button>
          </>
        }
      >
        <TextField label={at('lbl-group-name')} />

        <TextField
          multiline
          rows={3}
          maxRows={3}
          label={at('lbl-group-description')}
        />
      </FlexDialog>
    </>
  );
}
