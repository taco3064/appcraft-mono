import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import Dialog from '@mui/material/Dialog';
import { useState } from 'react';

import { CommonButton, CommonButtonProps } from '../CommonButton';
import { useFixedT } from '~appcraft/hooks';
import type * as Types from './RemoveButton.types';

export default function RemoveButton({
  icon,
  text,
  onCancel,
  onConfirm,
  ...props
}: Types.RemoveButtonProps) {
  const [at] = useFixedT('app');
  const [open, setOpen] = useState(false);

  return (
    <>
      <CommonButton
        {...(props as CommonButtonProps)}
        icon={icon || DeleteForeverOutlinedIcon}
        text={text || at('btn-remove')}
        onClick={() => setOpen(true)}
      />

      <Dialog
        fullWidth
        maxWidth="xs"
        open={open}
        onClose={() => {
          setOpen(false);
          onCancel?.();
        }}
      >
        <Alert
          variant="filled"
          severity="warning"
          action={
            <Button
              color="inherit"
              size="small"
              variant="text"
              onClick={() => onConfirm().finally(() => setOpen(false))}
            >
              {at('btn-confirm')}
            </Button>
          }
        >
          {at('txt-remove-content')}
        </Alert>
      </Dialog>
    </>
  );
}
