import type * as Appcraft from '@appcraft/types';
import type * as React from 'react';

import type * as Util from '../../utils';
import type { GeneratorSuperior, RendererOptions } from '../common';

//* 暫存
type GeneratorFn = (
  widget: Appcraft.WidgetOptions,
  options: {
    templates: Map<string, Appcraft.RootNodeWidget>;
    superiors?: GeneratorSuperior[];
    index?: number;
  }
) => JSX.Element;

// export type GetPropsOptions<P extends object> = {
//   defaultProps?: P;
//   superiors?: GeneratorSuperior[];
//   templates?: Map<string, Appcraft.RootNodeWidget>;
//   generator?: GeneratorFn;
//   onFetchTodoWrapper?: FetchTodoWrapperHandler;
//   onOutputCollect?: OutputCollectHandler;
// };

//* Variables
export { RendererOptions };
export type PlainTextProps = { children?: React.ReactNode };
export type PlainTextComponent = React.ComponentType<PlainTextProps>;

//* Mehtods
type ExternalLazy = (widgetType: string) => Util.LazyWidget;

type Renderer = (
  WidgetElement:
    | React.LazyExoticComponent<React.ComponentType>
    | React.LazyExoticComponent<PlainTextComponent>,
  options: {
    key: string;
    props: React.ComponentProps<typeof WidgetElement>;
  }
) => JSX.Element;

export type GeneratorHandlers = {
  lazy: ExternalLazy;
  onFetchTodoWrapper: Util.FetchTodoWrapperHandler;
  onOutputCollect?: Util.OutputCollectHandler;
  renderer: Renderer;
};

//* Custom Hooks
export type WidgetGeneratorHook = (
  options: RendererOptions,
  handlers: GeneratorHandlers
) => GeneratorFn;
