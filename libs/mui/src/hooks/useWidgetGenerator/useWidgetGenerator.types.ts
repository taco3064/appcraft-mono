import type {
  ComponentProps,
  ComponentType,
  LazyExoticComponent,
  ReactNode,
} from 'react';
import type * as Appcraft from '@appcraft/types';

export type ExternalLazy = (
  widgetType: string
) => LazyExoticComponent<ComponentType>;
export type PlainTextProps = { children?: ReactNode };
export type PlainTextComponent = ComponentType<PlainTextProps>;

export type GeneratorFn = (
  options: Appcraft.WidgetOptions,
  index: number
) => JSX.Element;

export type Renderer = (
  WidgetElement:
    | LazyExoticComponent<ComponentType>
    | LazyExoticComponent<PlainTextComponent>,
  props: ComponentProps<typeof WidgetElement>,
  index: number
) => JSX.Element;

export type GetTodoEventHandleUtil = (
  options: Appcraft.WidgetEvent[]
) => (...args: unknown[]) => Promise<Record<string, unknown>>;

export type WidgetGeneratorHook = (
  externalLazy: ExternalLazy,
  renderer: Renderer
) => GeneratorFn;
