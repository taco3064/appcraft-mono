import type * as Appcraft from '@appcraft/types';
import type * as React from 'react';

import type * as Util from '../../utils';

//* Variables
export type WrapperType = 'todo' | 'widget';

export type PlainTextComponent = React.ComponentType<{
  children?: React.ReactNode;
}>;

export type WidgetElement =
  | React.LazyExoticComponent<React.ComponentType>
  | React.LazyExoticComponent<PlainTextComponent>;

export type MutableHandles<W extends WrapperType> = {
  onFetchData: Util.FetchDataHandler;
  onFetchWrapper: FetchWrapperHandler<W>;
  onOutputCollect?: Util.OutputCollectHandler;
};

//* Methods
type GetWidgetFn = <W extends Appcraft.EntityWidgets | Appcraft.MainWidget>(
  widget?: W | string
) => [WidgetElement, W | Appcraft.MainWidget | undefined];

export type FetchWrapperHandler<W extends WrapperType> = (
  type: W,
  id: string
) => Promise<
  typeof type extends 'widget'
    ? Appcraft.MainWidget
    : Record<string, Appcraft.WidgetTodo>
>;

//* Custom Hooks
export type HandlesHook = () => {
  getWidget: GetWidgetFn;
  getWidgetOptions: Util.GetWidgetOptionsFn;
};

export type HandlesContextValue = Omit<ReturnType<HandlesHook>, 'getWidget'> & {
  mutablesRef: React.RefObject<MutableHandles<WrapperType>>;
};

//* Component Props
export interface HandlesProviderProps
  extends Omit<ReturnType<HandlesHook>, 'getWidget'>,
    MutableHandles<WrapperType> {
  children: React.ReactNode;
}
