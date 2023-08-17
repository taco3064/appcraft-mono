import type { Breakpoint } from '@mui/system';
import type { ConfigData, LayoutWidget } from '@appcraft/types';
import type { CraftedRendererProps } from '@appcraft/exhibitor';

export type PageValuesHook = (options: {
  data: ConfigData<LayoutWidget[], string>;
  onSave?: () => void;
}) => [
  LayoutWidget[],
  {
    add: () => void;
    change: (values: LayoutWidget[]) => void;
    reset: () => void;
    save: () => void;

    layout: (
      breakpoint: Breakpoint,
      layouts: Parameters<CraftedRendererProps['onLayoutChange']>[0]
    ) => void;
  }
];
