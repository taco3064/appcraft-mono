import type { ComponentProps, ReactNode } from 'react';
import type { EntityWidgets, MainWidget, NodeWidget } from '@appcraft/types';

import { useMutableHandles } from '../../contexts';
import type { WidgetElement } from '../../contexts';

//* Variables
export type GenerateQueue = {
  group: string;
  renderPaths?: string[];
  index?: number;
};

export type GetPropsArgs = [
  NodeWidget | MainWidget,
  GenerateQueue,
  {
    generate: GenerateFn;
    getHandles: ReturnType<typeof useMutableHandles>;
  }
];

//* Methods
type GenerateFn = (
  target: EntityWidgets | MainWidget | string,
  queue: GenerateQueue
) => ReactNode;

type RenderFn = (
  WidgetEl: WidgetElement,
  options: { key: string; props: ComponentProps<WidgetElement> }
) => JSX.Element;

export type GetPropsFn = <E extends WidgetElement>(
  widget: EntityWidgets | MainWidget,
  queue: GenerateQueue
) => ComponentProps<E>;

//* Custom Hooks
export type ComposerRenderHook = (render: RenderFn) => GenerateFn;
