import type * as Appcraft from '@appcraft/types';
import type { Theme } from '@mui/material/styles';

import type { FetchTodoWrap, OutputCollectHandler } from '../todo-parser';

//* Variables
export type GeneratorFn = (
  options: Appcraft.WidgetOptions,
  index: number
) => JSX.Element;

export type GetPropsOptions = {
  renderer?: GeneratorFn;
  fetchTodoWrap?: FetchTodoWrap;
  onOutputCollect?: OutputCollectHandler;
};

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
