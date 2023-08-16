import type { ConfigData, LayoutWidget } from '@appcraft/types';

export type PageValuesHook = (options: {
  data: ConfigData<LayoutWidget[], string>;
  onSave?: () => void;
}) => [
  LayoutWidget[],
  {
    change: (values: LayoutWidget[]) => void;
    reset: () => void;
    save: () => void;
  }
];
