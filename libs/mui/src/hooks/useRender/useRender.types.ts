import type * as Appcraft from '@appcraft/types';
import type * as React from 'react';

import { useRendererState } from '../useRendererState';
import type * as Util from '../../utils';
import type { StateQueue } from '../useRendererState';

//* Variables
export type PlainTextComponent = React.ComponentType<{
  children?: React.ReactNode;
}>;

//* Methods
export type FetchWrapperHandler<C extends 'widget' | 'todo'> = (
  type: C,
  id: string
) => Promise<
  C extends 'widget'
    ? Appcraft.RootNodeWidget
    : Record<string, Appcraft.WidgetTodo>
>;

export type GetGeneratorOptions = (
  widget: Appcraft.RootNodeWidget | Appcraft.WidgetOptions,
  propPath: string,
  queue: StateQueue,
  index?: number
) => StateQueue;

//* Custom Hook
export type RenderHook = (
  options: {
    onFetchTodoWrapper: FetchWrapperHandler<'todo'>;
    onLazyRetrieve: (type: string) => Util.LazyWidget;
    onOutputCollect?: Util.OutputCollectHandler;
  },
  globalState: ReturnType<typeof useRendererState>[1],
  render: (
    WidgetElement:
      | React.LazyExoticComponent<React.ComponentType>
      | React.LazyExoticComponent<PlainTextComponent>,
    options: {
      key: string;
      props: React.ComponentProps<typeof WidgetElement>;
    }
  ) => JSX.Element
) => (widget: Appcraft.WidgetOptions, options: StateQueue) => React.ReactNode;
