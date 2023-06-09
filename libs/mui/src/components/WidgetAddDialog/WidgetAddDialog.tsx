import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import type { FormEvent } from 'react';

import { FlexDialog } from '../../styles';
import { useFixedT } from '../../contexts';
import type { WidgetAddDialogProps, WidgetInfo } from './WidgetAddDialog.types';

export default function WidgetAddDialog({
  fixedT,
  open,
  renderWidgetTypeSelection,
  onClose,
  onConfirm,
}: WidgetAddDialogProps) {
  const ct = useFixedT(fixedT);

  const [info, setInfo] = useState<WidgetInfo>({
    id: `Widget_${Math.random().toFixed(5).replace('.', '')}`,
    type: '',
  });

  return (
    <FlexDialog
      {...{ open, onClose }}
      fullWidth
      maxWidth="xs"
      direction="column"
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
      PaperProps={
        {
          component: 'form',
          onSubmit: (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            onConfirm(info);
            onClose(e, 'escapeKeyDown');
          },
        } as object
      }
    >
      {renderWidgetTypeSelection((e) =>
        setInfo({ ...info, type: e.target.value })
      )}

      <TextField
        fullWidth
        size="small"
        margin="dense"
        variant="outlined"
        label={ct('lbl-description')}
        defaultValue={info.description || ''}
        onChange={(e) => setInfo({ ...info, description: e.target.value })}
      />
    </FlexDialog>
  );
}
