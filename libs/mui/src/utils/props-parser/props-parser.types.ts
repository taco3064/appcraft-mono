import type * as Appcraft from '@appcraft/types';
import type { ComponentType, LazyExoticComponent } from 'react';
import type { Theme } from '@mui/material/styles';

//* Variables
export type LazyWidget = LazyExoticComponent<ComponentType>;

//* Methods
export type GetDefaultProps = (
  theme: Theme,
  type: string
) => Record<string, unknown>;

export type GetNodesAndEventsKey = (
  options: Pick<Appcraft.WidgetOptions, 'category'> &
    Partial<Pick<Appcraft.NodeWidget, 'typeFile' | 'typeName'>>,

  defaultKey?: string
) => string;

export type SplitProps = (
  target: unknown,
  paths?: (string | number)[]
) => Record<string, unknown>;
