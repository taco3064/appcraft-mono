import type * as Appcraft from '@appcraft/types';
import type { Theme } from '@mui/material/styles';

import type {
  ComponentProps,
  ComponentType,
  LazyExoticComponent,
  ReactNode,
} from 'react';

//* Variables
export type ExecuteRecord = {
  event: unknown[];
  output: Record<string, unknown>;
};
export type PlainTextProps = { children?: ReactNode };
export type PlainTextComponent = ComponentType<PlainTextProps>;

//* Mehtods
export type SplitPropsUtil = (
  target: unknown,
  paths?: (string | number)[]
) => Record<string, unknown>;

export type ExternalLazy = (
  widgetType: string
) => LazyExoticComponent<ComponentType>;

export type Renderer = (
  WidgetElement:
    | LazyExoticComponent<ComponentType>
    | LazyExoticComponent<PlainTextComponent>,
  props: ComponentProps<typeof WidgetElement>,
  index: number
) => JSX.Element;

export type GeneratorFn = (
  options: Appcraft.WidgetOptions,
  index: number
) => JSX.Element;

//* Custom Hooks
export type WidgetGeneratorHook = (
  externalLazy: ExternalLazy,
  renderer: Renderer
) => GeneratorFn;

//* Util Methods
export type GetDefaultPropsUtil = (
  theme: Theme,
  type: string
) => Record<string, unknown>;

export type GetTodoEventHandleUtil = (
  options: Record<string, Appcraft.WidgetTodo>
) => (...event: unknown[]) => Promise<void>;

//* Private Methods
export type GetVaraiblePrivate = (
  variable: Appcraft.Variables,
  record: ExecuteRecord
) => unknown;

export type RunPrivate = (
  todo: Appcraft.WidgetTodo,
  options: { todos: Record<string, Appcraft.WidgetTodo>; record: ExecuteRecord }
) => Promise<void>;
