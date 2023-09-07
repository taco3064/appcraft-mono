import type * as Appcraft from '@appcraft/types';
import type { ComponentProps, ReactNode } from 'react';

import { useMutableHandles } from '../../contexts';
import type * as Ctx from '../../contexts';

//* Variables
export type GenerateQueue = {
  group: string;
  index?: number;
  injection?: Appcraft.LayoutWidget['template'];
  renderPaths?: string[];
};

export type GetPropsArgs = [
  Appcraft.NodeWidget | Appcraft.MainWidget,
  GenerateQueue,
  Ctx.MutableHandles<'todo'> & {
    generate: GenerateFn;
    getGlobalState: Ctx.GetGlobalStateFn;
    onStateChange: Ctx.StateChangeHandler;
  }
];

//* Methods
type GenerateFn = (
  target: Appcraft.EntityWidgets | Appcraft.MainWidget | string,
  queue: GenerateQueue
) => ReactNode;

type RenderFn = (
  WidgetEl: Ctx.WidgetElement,
  options: { key: string; props: ComponentProps<Ctx.WidgetElement> }
) => JSX.Element;

export type GetPropsFn = <E extends Ctx.WidgetElement>(
  widget: Appcraft.EntityWidgets | Appcraft.MainWidget,
  queue: GenerateQueue
) => ComponentProps<E>;

//* Custom Hooks
export type ComposerRenderHook = (render: RenderFn) => GenerateFn;
