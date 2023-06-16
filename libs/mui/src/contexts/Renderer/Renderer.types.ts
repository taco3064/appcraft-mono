import type { ComponentType, LazyExoticComponent, ReactNode } from 'react';

//* Context Value
export interface RendererContextValue {
  lazy?: (widgetType: string) => LazyExoticComponent<ComponentType>;
}

//* Provider Props
export interface RendererProviderProps extends Required<RendererContextValue> {
  children: ReactNode;
}
