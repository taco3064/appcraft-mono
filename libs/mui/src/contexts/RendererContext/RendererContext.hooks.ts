import * as React from 'react';
import type * as Types from './RendererContext.types';

export const RendererContext = (<T extends Types.RenderType>() =>
  React.createContext<Types.RendererValue<T>>({}))();

const useContext = <T extends Types.RenderType>() =>
  React.useContext(RendererContext) as Required<Types.RendererValue<T>>;
