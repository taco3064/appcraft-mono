import * as React from 'react';
import type * as Types from './RendererContext.types';

export const RendererContext = React.createContext<Types.RendererValue>({
  options: {
    widgets: [],
  },
});

const useContext: Types.ContextHook = () => React.useContext(RendererContext);
