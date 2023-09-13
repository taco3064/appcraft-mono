import { ExhibitorUtil } from '@appcraft/exhibitor';
import type * as Appcraft from '@appcraft/types';
import type { Theme } from '@mui/material/styles';

//* Variables
export type PropPaths = Parameters<typeof ExhibitorUtil.getPropPath>[0];

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

export type GetPropOrderSeq = (type: Appcraft.PropTypesDef['type']) => number;

export type SplitProps = (
  target: unknown,
  options?: { paths?: (string | number)[]; ignoreSplitArray?: boolean }
) => Record<string, unknown>;
