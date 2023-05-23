import type { ReactNode } from 'react';
import type { WidgetOptions } from '@appcraft/types';

export interface RendererProviderProps {
  children: ReactNode;

  options: {
    widgets: WidgetOptions[];
  };
}

export type RendererValue = Pick<RendererProviderProps, 'options'>;
export type ContextHook = () => RendererValue;
