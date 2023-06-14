import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { FormEvent, useState } from 'react';
import type { NodeWidget } from '@appcraft/types';

import { FlexDialog } from '../../styles';
import { useFixedT } from '../../contexts';
import type { WidgetAddDialogProps } from './WidgetAddDialog.types';

export default function WidgetAddDialog({
  fixedT,
  open,
  renderWidgetTypeSelection,
  onClose,
  onConfirm,
}: WidgetAddDialogProps) {
  const ct = useFixedT(fixedT);
  const [data, setData] = useState<NodeWidget | null>(null);

  const handleClose: typeof onClose = (...e) => {
    setData(null);
    onClose(...e);
  };

  return (
    <FlexDialog
      fullWidth
      maxWidth="xs"
      direction="column"
      open={open}
      onClose={handleClose}
      action={
        <>
          <Button onClick={(e) => handleClose(e, 'escapeKeyDown')}>
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

            onConfirm(data as NodeWidget);
            handleClose(e, 'escapeKeyDown');
          },
        } as object
      }
    >
      {renderWidgetTypeSelection({
        onChange: (e) =>
          setData({ ...e, category: 'node', description: data?.description }),
      })}

      <TextField
        fullWidth
        size="small"
        margin="dense"
        variant="outlined"
        label={ct('lbl-description')}
        defaultValue={data?.description || ''}
        onChange={(e) =>
          setData({ ...(data as NodeWidget), description: e.target.value })
        }
      />
    </FlexDialog>
  );
}
