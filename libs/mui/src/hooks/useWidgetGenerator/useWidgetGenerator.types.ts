import type * as React from 'react';

import type { FetchTodoWrap, GeneratorFn } from '../../utils';

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
  props: React.ComponentProps<typeof WidgetElement>,
  index: number
) => JSX.Element;

//* Custom Hooks
export type WidgetGeneratorHook = (
  externalLazy: ExternalLazy,
  fetchTodoWrap: FetchTodoWrap,
  renderer: Renderer
) => GeneratorFn;
