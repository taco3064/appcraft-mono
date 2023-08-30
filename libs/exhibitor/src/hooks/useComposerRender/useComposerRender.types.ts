import type * as Appcraft from '@appcraft/types';
import type * as React from 'react';

import { usePropsStateMaestro } from '../usePropsStateMaestro';
import type * as Util from '../../utils';
import type { StateQueue } from '../usePropsStateMaestro';

//* Variables
type LazyWidget = React.LazyExoticComponent<React.ComponentType>;

export type PlainTextComponent = React.ComponentType<{
  children?: React.ReactNode;
}>;

//* Methods
export type FetchWrapperHandler<C extends 'widget' | 'todo'> = (
  type: C,
  id: string
) => Promise<
  C extends 'widget' ? Appcraft.MainWidget : Record<string, Appcraft.WidgetTodo>
>;

export type GetGeneratorOptions = (
  widget: Appcraft.MainWidget | Appcraft.EntityWidgets,
  propPath: string,
  queue: StateQueue,
  index?: number
) => StateQueue;

//* Custom Hook
export type ComposerRenderHook = (
  options: {
    onFetchData: Util.FetchDataHandler;
    onFetchTodoWrapper: FetchWrapperHandler<'todo'>;
    onLazyRetrieve: (type: string) => LazyWidget;
    onOutputCollect?: Util.OutputCollectHandler;
  },
  globalState: ReturnType<typeof usePropsStateMaestro>,
  render: (
    WidgetElement:
      | React.LazyExoticComponent<React.ComponentType>
      | React.LazyExoticComponent<PlainTextComponent>,
    options: {
      key: string;
      props: React.ComponentProps<typeof WidgetElement>;
    }
  ) => JSX.Element
) => (widget: Appcraft.EntityWidgets, options: StateQueue) => React.ReactNode;
