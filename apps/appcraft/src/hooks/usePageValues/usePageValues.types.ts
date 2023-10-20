import type { Breakpoint } from '@mui/material/styles';
import type { ConfigData, LayoutWidget, WidgetTodo } from '@appcraft/types';
import type { CraftedRendererProps } from '@appcraft/exhibitor';

//* Variables
export type GridLayoutOptions = Record<
  Breakpoint,
  { max: number; min: number }
>;

export type PageData = {
  layouts: LayoutWidget[];
  readyTodos?: Record<string, WidgetTodo>;
};

//* Methods
type ResizeHandler = CraftedRendererProps['CollectionGridProps']['onResize'];

//* Custom Hooks
export type PageValuesHook = (options: {
  data: ConfigData<PageData, string>;
  onSave?: () => void;
}) => [
  Required<PageData> & {
    active?: number;
    breakpoint: Breakpoint;
    refresh: string;
  },
  {
    active: (e?: LayoutWidget) => void;
    add: () => void;
    breakpoint: (e: Breakpoint) => void;
    change: <K extends keyof PageData>(key: K, value: PageData[K]) => void;
    remove: (e: LayoutWidget) => void;
    reset: () => void;
    resize: ResizeHandler;
    save: () => void;
  }
];
