import Button from '@mui/material/Button';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useState } from 'react';

import { ArcAlert } from '~appcraft/styles';
import { CommonButton } from '~appcraft/components/common';
import { useFixedT } from '~appcraft/contexts';
import type * as Types from './RemoveButton.types';
import type { CommonButtonProps } from '~appcraft/components/common';

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
        icon={icon || <DeleteForeverOutlinedIcon />}
        text={text || at('btn-remove')}
        onClick={() => setOpen(true)}
      />

      <ArcAlert
        severity="warning"
        open={open}
        icon={<HelpOutlineIcon />}
        style={{ userSelect: 'none' }}
        action={
          <Button
            color="inherit"
            variant="text"
            onClick={async () => {
              await onConfirm();
              setOpen(false);
            }}
          >
            {at('btn-confirm')}
          </Button>
        }
        onClose={() => {
          setOpen(false);
          onCancel?.();
        }}
      >
        {at('msg-remove-content')}
      </ArcAlert>
    </>
  );
}
