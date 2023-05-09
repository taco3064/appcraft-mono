import Button from '@mui/material/Button';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useState } from 'react';

import { ArcAlert } from '~appcraft/styles';
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

      <ArcAlert
        severity="warning"
        open={open}
        icon={<HelpOutlineIcon />}
        action={
          <Button
            color="inherit"
            variant="text"
            onClick={() => onConfirm().finally(() => setOpen(false))}
          >
            {at('btn-confirm')}
          </Button>
        }
        onClose={() => {
          setOpen(false);
          onCancel?.();
        }}
      >
        {at('txt-remove-content')}
      </ArcAlert>
    </>
  );
}
