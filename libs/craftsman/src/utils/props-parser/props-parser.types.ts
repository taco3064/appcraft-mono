import type * as Appcraft from '@appcraft/types';
import type { Theme } from '@mui/material/styles';

//* Methods
export type GetDefaultProps = (
  theme: Theme,
  type: string
) => Record<string, unknown>;

export type GetNodesAndEventsKey = (
  options: Pick<Appcraft.EntityWidgets, 'category'> &
    Partial<Pick<Appcraft.NodeWidget, 'typeFile' | 'typeName'>>,

  defaultKey?: string
) => string;

export type SplitProps = (
  target: unknown,
  paths?: (string | number)[]
) => Record<string, unknown>;
