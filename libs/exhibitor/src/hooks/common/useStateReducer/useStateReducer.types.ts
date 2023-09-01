import type * as Appcraft from '@appcraft/types';
import type { Dispatch } from 'react';

import type * as Util from '../../../utils';
import type { RenderedWidget, WidgetRegistry } from '../index.types';

//* Variables
export type InjectionProps = {
  [widgetid: string]: Omit<Appcraft.LayoutWidget['template'], 'id'>;
};

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
export type InitialAction = Map<
  string,
  {
    widget: Appcraft.MainWidget;
    props?: InjectionProps;
  }
>;

export type ReducerAction = {
  id: string;
  isProps?: boolean;
  values: Parameters<Util.StateChangeHandler>[0];
};

export type ReducerState = Record<
  string,
  {
    [stateKey: string]: {
      category: Appcraft.StateCategory;
      isProps: boolean;
      value: unknown;
      propPath: string;
      options: Appcraft.WidgetState;
    };
  }
>;

export type StateReducerHook = (
  tempaltes: WidgetRegistry,
  options: RenderedWidget,
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
