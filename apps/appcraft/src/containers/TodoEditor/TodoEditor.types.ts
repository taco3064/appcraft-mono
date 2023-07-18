import type { ConfigData, WidgetTodo } from '@appcraft/types';
import type { ContainerProps } from '@mui/material/Container';

import type { Breadcrumb, NodePickerFn } from '~appcraft/hooks';

export interface TodoEditorProps {
  ContentProps?: Omit<ContainerProps, 'children' | 'disableGutters' | 'style'>;
  data: ConfigData<Record<string, WidgetTodo>, string>;
  onActionNodePick?: NodePickerFn<'run' | 'reset' | 'save'>;
  onSave?: () => void;

  superiors: {
    names: Record<string, string>;
    breadcrumbs: Breadcrumb[];
  };
}
