import type * as Appcraft from '@appcraft/types';
import type { DialogProps } from '@mui/material/Dialog';
import type { ReactNode } from 'react';

import type { EditingTodo } from '../../utils';
import type { FixedT } from '../../contexts';

export interface MutationTodoNodeDialogProps
  extends Required<Pick<DialogProps, 'open' | 'onClose'>> {
  ct: FixedT;
  values?: EditingTodo;
  onConfirm: (e: Appcraft.WidgetTodo) => void;
  renderEditor: (todoConfig: Appcraft.ConfigOptions) => ReactNode;
}
