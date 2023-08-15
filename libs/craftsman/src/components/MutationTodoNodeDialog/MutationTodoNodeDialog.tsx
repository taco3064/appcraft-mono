import Button from '@mui/material/Button';
import { ExhibitorUtil } from '@appcraft/exhibitor';
import type * as Appcraft from '@appcraft/types';

import { FlexDialog } from '../../styles';
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
      disableContentGutter
      disableContentJustifyCenter
      fullWidth
      maxWidth="xs"
      direction="column"
      title={values?.todo.description || ct('ttl-events')}
      action={
        <>
          <Button onClick={(e) => onClose(e, 'escapeKeyDown')}>
            {ct('btn-cancel')}
          </Button>

          <Button
            color="primary"
            onClick={(e) => {
              const { mixedTypes } = values?.config || {};

              const todo = ExhibitorUtil.getProps<Appcraft.WidgetTodo>(
                values?.config?.props
              );

              onClose(e, 'escapeKeyDown');
              onConfirm(!mixedTypes ? todo : { ...todo, mixedTypes });
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
