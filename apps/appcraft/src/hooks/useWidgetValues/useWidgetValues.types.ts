import type { ConfigData, RootNodeWidget } from '@appcraft/types';
import type { CraftedWidgetEditorProps } from '@appcraft/mui';

export type WidgetValuesHook = (
  data: ConfigData<RootNodeWidget, string>
) => Pick<CraftedWidgetEditorProps, 'onWidgetChange'> & {
  widget?: RootNodeWidget;
  onReset: () => void;
};
