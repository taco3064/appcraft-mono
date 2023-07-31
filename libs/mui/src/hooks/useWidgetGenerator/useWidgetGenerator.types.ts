import type * as Appcraft from '@appcraft/types';
import type * as React from 'react';

import type * as Util from '../../utils';
import type { GeneratorSuperior, RendererOptions, Templates } from '../common';

//* Variables
export { RendererOptions };
export type PlainTextProps = { children?: React.ReactNode };
export type PlainTextComponent = React.ComponentType<PlainTextProps>;

//* Mehtods
type ExternalLazy = (widgetType: string) => Util.LazyWidget;

export type GeneratorHandlers = {
  lazy: ExternalLazy;
  onFetchTodoWrapper: Util.FetchTodoWrapperHandler;
  onOutputCollect?: Util.OutputCollectHandler;

  renderer: (
    WidgetElement:
      | React.LazyExoticComponent<React.ComponentType>
      | React.LazyExoticComponent<PlainTextComponent>,
    options: {
      key: string;
      props: React.ComponentProps<typeof WidgetElement>;
    }
  ) => JSX.Element;
};

//* Custom Hooks
export type WidgetGeneratorHook = (
  options: RendererOptions,
  templates: Templates,
  handlers: GeneratorHandlers
) => (
  widget: Appcraft.WidgetOptions,
  options?: {
    superiors?: GeneratorSuperior[];
    index?: number;
    defaultProps?: object;
  }
) => JSX.Element;
