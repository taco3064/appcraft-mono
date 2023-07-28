import type * as React from 'react';
import type * as Util from '../../utils';

//* Variables
export type PlainTextProps = { children?: React.ReactNode };
export type PlainTextComponent = React.ComponentType<PlainTextProps>;

//* Mehtods
export type ExternalLazy = (
  widgetType: string
) => React.LazyExoticComponent<React.ComponentType>;

export type Renderer = (
  WidgetElement:
    | React.LazyExoticComponent<React.ComponentType>
    | React.LazyExoticComponent<PlainTextComponent>,
  options: {
    key: string;
    props: React.ComponentProps<typeof WidgetElement>;
  }
) => JSX.Element;

//* Custom Hooks
export type WidgetGeneratorHook = (
  options: {
    externalLazy: ExternalLazy;
    onFetchTodoWrapper: Util.FetchTodoWrapperHandler;
    onOutputCollect?: Util.OutputCollectHandler;
  },
  renderer: Renderer
) => Util.GeneratorFn;
