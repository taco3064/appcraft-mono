import type * as Appcraft from '@appcraft/types';
import type { DialogProps } from '@mui/material/Dialog';
import type { ReactNode } from 'react';

import type { EditingTodo } from '../../utils';

export interface MutationTodoNodeDialogProps
  extends Required<Pick<DialogProps, 'open' | 'onClose'>> {
  values?: EditingTodo;
  onConfirm: (e: Appcraft.WidgetTodo) => void;
  renderEditor: (todoConfig: Appcraft.ConfigOptions) => ReactNode;
}
