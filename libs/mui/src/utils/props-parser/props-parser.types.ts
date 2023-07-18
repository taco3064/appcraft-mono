import type * as Appcraft from '@appcraft/types';
import type { Theme } from '@mui/material/styles';

//* Variables
export type GeneratorFn = (
  options: Appcraft.WidgetOptions,
  index: number
) => JSX.Element;

//* Methods
export type GetDefaultProps = (
  theme: Theme,
  type: string
) => Record<string, unknown>;

export type GetNodesAndEventsKey = (
  options: Appcraft.WidgetOptions,
  defaultKey?: string
) => string;

export type SplitProps = (
  target: unknown,
  paths?: (string | number)[]
) => Record<string, unknown>;
