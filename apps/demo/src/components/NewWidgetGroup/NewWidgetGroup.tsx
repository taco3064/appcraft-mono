import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';

import type * as Types from './NewWidgetGroup.types';
import { FlexDialog } from '~demo/styles';
import { useFixedT } from '~demo/hooks';

export default function NewWidgetGroup({}: Types.NewWidgetGroupProps) {
  const [at, wt] = useFixedT('app', 'widgets');
  const [open, setOpen] = useState(false);

  return (
    <>
      <Tooltip title={wt('btn-add-group')}>
        <IconButton onClick={() => setOpen(true)}>
          <BookmarkAddIcon fontSize="large" />
        </IconButton>
      </Tooltip>

      <FlexDialog
        fullWidth
        direction="column"
        maxWidth="xs"
        title={wt('btn-add-group')}
        open={open}
        action={
          <Button color="inherit" onClick={() => setOpen(false)}>
            {at('btn-cancel')}
          </Button>
        }
      >
        <TextField label={wt('lbl-group-name')} />

        <TextField
          multiline
          rows={3}
          maxRows={3}
          label={wt('lbl-group-description')}
        />
      </FlexDialog>
    </>
  );
}
