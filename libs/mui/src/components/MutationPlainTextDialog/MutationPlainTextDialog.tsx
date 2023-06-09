import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { FormEvent } from 'react';
import type * as Appcraft from '@appcraft/types';

import { FlexDialog } from '../../styles';
import type { MutationPlainTextDialogProps } from './MutationPlainTextDialog.types';

export default function MutationPlainTextDialog({
  ct,
  open,
  values,
  onClose,
  onConfirm,
}: MutationPlainTextDialogProps) {
  return (
    <FlexDialog
      {...{ open, onClose }}
      fullWidth
      maxWidth="xs"
      direction="column"
      onSubmit={(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        onConfirm({ ...values } as Appcraft.PlainTextWidget);
        onClose(e, 'escapeKeyDown');
      }}
      action={
        <>
          <Button onClick={(e) => onClose(e, 'escapeKeyDown')}>
            {ct('btn-cancel')}
          </Button>

          <Button type="submit" color="primary">
            {ct('btn-confirm')}
          </Button>
        </>
      }
    >
      {open && (
        <TextField
          autoFocus
          fullWidth
          required
          size="small"
          margin="dense"
          variant="outlined"
          label={ct('lbl-plain-text')}
          defaultValue={values?.content || ''}
          onChange={(e) =>
            ((values as Appcraft.PlainTextWidget).content = e.target.value)
          }
        />
      )}
    </FlexDialog>
  );
}
