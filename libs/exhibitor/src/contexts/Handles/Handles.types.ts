import type * as Appcraft from '@appcraft/types';
import type * as React from 'react';

import type * as Util from '../../utils';

//* Variables
type WrapperType = 'todo' | 'widget';

export type PlainTextComponent = React.ComponentType<{
  children?: React.ReactNode;
}>;

export type WidgetElement =
  | React.LazyExoticComponent<React.ComponentType>
  | React.LazyExoticComponent<PlainTextComponent>;

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

export type GetWidgetOptionsFn = (
  getBy: 'template' | 'widget',
  id: string
) => Appcraft.MainWidget | undefined;

export type ReadyHandler =
  | Record<string, Appcraft.WidgetTodo>
  | ((onPropsChange: Util.PropsChangeHandler) => Promise<void>);

//* Custom Hooks
export type HandlesHook = () => {
  getWidget: GetWidgetFn;
  getWidgetOptions: GetWidgetOptionsFn;
  onReady?: ReadyHandler;
};

export type MutableHandlesHook = () => <W extends WrapperType>() => {
  onFetchData: Util.FetchDataHandler;
  onFetchWrapper: FetchWrapperHandler<W>;
  onOutputCollect?: Util.OutputCollectHandler;
};

export type HandlesContextValue = Omit<ReturnType<HandlesHook>, 'getWidget'> & {
  mutablesRef?: React.MutableRefObject<
    ReturnType<ReturnType<MutableHandlesHook>>
  >;
};

//* Component Props
export interface HandlesProviderProps
  extends Omit<ReturnType<HandlesHook>, 'getWidget'>,
    ReturnType<ReturnType<MutableHandlesHook>> {
  children: React.ReactNode;
}
