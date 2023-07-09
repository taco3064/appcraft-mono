import Button from '@mui/material/Button';
import type * as Appcraft from '@appcraft/types';

import { FlexDialog } from '../../styles';
import { getProps } from '../../hooks';
import type { MutationTodoNodeDialogProps } from './MutationTodoNodeDialog.types';

export default function MutationTodoNodeDialog({
  ct,
  open,
  values,
  renderEditor,
  onClose,
  onConfirm,
}: MutationTodoNodeDialogProps) {
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

          <Button
            color="primary"
            onClick={(e) => {
              const todo = getProps<Appcraft.WidgetTodo>(
                values?.config as Appcraft.ConfigOptions
              );

              onClose(e, 'escapeKeyDown');
              onConfirm(todo);
            }}
          >
            {ct('btn-confirm')}
          </Button>
        </>
      }
    >
      {values?.config && renderEditor(values?.config as Appcraft.ConfigOptions)}
    </FlexDialog>
  );
}
