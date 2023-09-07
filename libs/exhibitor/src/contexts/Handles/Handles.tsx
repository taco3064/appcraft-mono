import * as React from 'react';
import { LazyWidget } from '@appcraft/widgets';

import type * as Types from './Handles.types';

const LazyPlainText = React.lazy<Types.PlainTextComponent>(async () => ({
  default: ({ children }) => children as JSX.Element,
}));

//* Custom Hooks
const HandlesContext = React.createContext<Types.HandlesContextValue>({
  getWidgetOptions: () => undefined,
  mutablesRef: React.createRef<Types.MutableHandles<Types.WrapperType>>(),
});

export const useHandles: Types.HandlesHook = () => {
  const { getWidgetOptions, onReady } = React.useContext(HandlesContext);

  return {
    getWidgetOptions,
    onReady,
    getWidget: (target) => {
      const widget =
        typeof target !== 'string'
          ? target
          : getWidgetOptions('template', target as string);

      const WidgetElement =
        widget?.category === 'node' ? LazyWidget[widget.type] : LazyPlainText;

      return [WidgetElement, widget];
    },
  };
};

export const useMutableHandles = () => {
  const { mutablesRef } = React.useContext(HandlesContext);

  return React.useCallback(
    <W extends Types.WrapperType>() =>
      mutablesRef.current as Types.MutableHandles<W> | null,
    [mutablesRef]
  );
};

//* Provider Component
export default function HandlesProvider({
  children,
  getWidgetOptions,
  onFetchData,
  onFetchWrapper,
  onOutputCollect,
  onReady,
}: Types.HandlesProviderProps) {
  const mutablesRef = React.useRef({
    onFetchData,
    onFetchWrapper,
    onOutputCollect,
  });

  const value = React.useMemo(
    () => ({ mutablesRef, getWidgetOptions, onReady }),
    [getWidgetOptions, onReady]
  );

  React.useImperativeHandle(
    mutablesRef,
    () => ({ onFetchData, onFetchWrapper, onOutputCollect }),
    [onFetchData, onFetchWrapper, onOutputCollect]
  );

  return (
    <HandlesContext.Provider value={value}>{children}</HandlesContext.Provider>
  );
}
