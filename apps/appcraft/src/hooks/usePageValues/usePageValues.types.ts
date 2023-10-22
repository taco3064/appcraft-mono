import type * as Appcraft from '@appcraft/types';
import type { Breakpoint } from '@mui/material/styles';
import type { CraftedRendererProps, MaxWidthes } from '@appcraft/exhibitor';

//* Variables
export type GridLayoutOptions = Record<
  Breakpoint,
  { max: number; min: number }
>;

export type PageData = {
  layouts: Appcraft.LayoutWidget[];
  maxWidthes?: MaxWidthes;
  readyTodos?: Record<string, Appcraft.WidgetTodo>;
};

//* Methods
type ResizeHandler = CraftedRendererProps['CollectionGridProps']['onResize'];

//* Custom Hooks
export type PageValuesHook = (options: {
  data: Appcraft.ConfigData<PageData, string>;
  onSave?: () => void;
}) => [
  Required<PageData> & {
    active?: number;
    breakpoint: Breakpoint;
    refresh: string;
  },
  {
    active: (e?: Appcraft.LayoutWidget) => void;
    add: () => void;
    breakpoint: (e: Breakpoint) => void;
    change: <K extends keyof PageData>(key: K, value: PageData[K]) => void;
    remove: (e: Appcraft.LayoutWidget) => void;
    reset: () => void;
    resize: ResizeHandler;
    save: () => void;
  }
];
