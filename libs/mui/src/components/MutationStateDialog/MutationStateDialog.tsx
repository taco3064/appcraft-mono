import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { FormEvent } from 'react';
import type { RootNodeWidget } from '@appcraft/types';

import { FlexDialog } from '../../styles';
import type { MutationStateDialogProps } from './MutationStateDialog.types';

export default function MutationStateDialog({
  ct,
  open,
  values,
  onClose,
  onConfirm,
}: MutationStateDialogProps) {
  return (
    <FlexDialog
      {...{ open, onClose }}
      fullWidth
      maxWidth="xs"
      direction="column"
      onSubmit={(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        onConfirm({ ...values } as RootNodeWidget);
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
      TEST
    </FlexDialog>
  );
}
