import type { ConfigData, MainWidget } from '@appcraft/types';
import type { CraftedWidgetEditorProps } from '@appcraft/craftsman';

export type WidgetValuesHook = (options: {
  data: ConfigData<MainWidget, string>;
  onSave?: () => void;
}) => [
  MainWidget | undefined,
  {
    change: CraftedWidgetEditorProps['onWidgetChange'];
    reset: () => void;
    save: () => void;
  }
];
