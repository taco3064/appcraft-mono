import type * as Appcraft from '@appcraft/types';
import type { Dispatch } from 'react';

import type * as Util from '../../../utils';

//* Variables
export type ReadyHandler =
  | Record<string, Appcraft.WidgetTodo>
  | ((onPropsChange: Util.PropsChangeHandler) => Promise<void>);

export type ReadyRef = [
  Parameters<StateReducerHook>[2]['onReady'],
  Omit<Parameters<StateReducerHook>[2], 'onReady'> & {
    onPropsChange: Util.PropsChangeHandler;
  }
];

//* Custom Hooks
export type ReducerState = Record<
  string,
  {
    [stateKey: string]: {
      category: Appcraft.StateCategory;
      value: unknown;
      propPath: string;
      options: Appcraft.WidgetState;
    };
  }
>;

export type ReducerAction = {
  id: string;
  values: Parameters<Util.StateChangeHandler>[0];
};

export type StateReducerHook = (
  tempaltes: Util.WidgetMap,
  options: Util.RendererOptions,
  ready: Pick<
    Parameters<typeof Util.getEventHandler>[1],
    'onFetchData' | 'onFetchTodoWrapper' | 'onOutputCollect'
  > & {
    onReady?: ReadyHandler;
  }
) => [
  ReducerState,
  {
    props: Util.PropsChangeHandler;
    state: Dispatch<ReducerAction | ReducerAction[]>;
  }
];
