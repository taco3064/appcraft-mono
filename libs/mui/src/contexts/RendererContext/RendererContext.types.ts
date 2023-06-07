import type { ReactNode } from 'react';
import type { WidgetOptions } from '@appcraft/types';

export type RenderType = 'widget' | 'dashboard';

export type WidgetLayout = {
  widget: WidgetOptions;
};

export interface RendererProviderProps<T extends RenderType> {
  children: ReactNode;
  options: T extends 'widget' ? WidgetOptions : WidgetLayout[];
}

export type RendererValue<T extends RenderType> = Partial<
  Pick<RendererProviderProps<T>, 'options'>
>;
