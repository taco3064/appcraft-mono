import type { ConfigData, RootNodeWidget } from '@appcraft/types';
import type { CraftedWidgetEditorProps } from '@appcraft/mui';

export type WidgetValuesHook = (options: {
  data: ConfigData<RootNodeWidget, string>;
  onSave?: () => void;
}) => [
  RootNodeWidget | undefined,
  {
    change: CraftedWidgetEditorProps['onWidgetChange'];
    reset: () => void;
    save: () => void;
  }
];
