import Button from '@mui/material/Button';
import { CraftsmanStyle } from '@appcraft/craftsman';
import { useState } from 'react';
import type { FormEventHandler } from 'react';

import WidgetPicker from '../WidgetPicker';
import { useFixedT } from '~appcraft/hooks';
import type { NodeTemplateDialogProps } from './NodeTemplateDialog.types';

export default function NodeTemplateDialog({
  open,
  onClose,
  onConfirm,
}: NodeTemplateDialogProps) {
  const [at, pt] = useFixedT('app', 'pages');
  const [selected, setSelected] = useState<string>();

  const handleClose = () => {
    onClose();
    setSelected(undefined);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    handleClose();
    onConfirm(selected);
  };

  return (
    <CraftsmanStyle.FlexDialog
      fullWidth
      maxWidth="xs"
      title={pt('ttl-new-template')}
      open={open}
      onClose={handleClose}
      onSubmit={handleSubmit}
      action={
        <>
          <Button color="inherit" onClick={handleClose}>
            {at('btn-cancel')}
          </Button>

          <Button type="submit" color="primary">
            {at('btn-confirm')}
          </Button>
        </>
      }
    >
      <WidgetPicker
        label={pt('lbl-widget')}
        value={selected}
        onChange={setSelected}
      />
    </CraftsmanStyle.FlexDialog>
  );
}
