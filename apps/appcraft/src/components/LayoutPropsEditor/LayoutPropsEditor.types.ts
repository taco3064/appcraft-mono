import type { GetWidgetOptionsFn } from '@appcraft/exhibitor';
import type { LayoutWidget } from '@appcraft/types';

import type { NodeTemplateDialogProps } from '../NodeTemplateDialog';

export interface LayoutPropsEditorProps
  extends Pick<NodeTemplateDialogProps, 'renderPicker'> {
  layouts: LayoutWidget[];
  value: LayoutWidget;
  getWidgetOptions: GetWidgetOptionsFn;
  onChange: (value: LayoutWidget) => void;
  onClose: () => void;
}
