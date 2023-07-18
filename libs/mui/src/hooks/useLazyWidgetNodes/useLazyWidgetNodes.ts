import { lazy, useImperativeHandle, useMemo, useRef } from 'react';
import type * as Appcraft from '@appcraft/types';

import type * as Types from './useLazyWidgetNodes.types';

const useLazyWidgetNodes = <R>(
  items: Appcraft.WidgetOptions[],
  version: string | undefined,
  fetchNodesAndEvents: Types.FetchNodesAndEvents,
  renderFn: Types.RenderFn<Appcraft.NodeAndEventProps, R>
) => {
  const fetchRef = useRef(fetchNodesAndEvents);
  const renderRef = useRef(renderFn);

  useImperativeHandle(renderRef, () => renderFn, [renderFn]);

  return useMemo(
    () =>
      lazy(async () => {
        const fetchData = await fetchRef.current(items, version);

        return {
          default: (props: R) =>
            renderRef.current({ ...props, fetchData, widgets: items }),
        };
      }),
    [items, version]
  );
};

export default useLazyWidgetNodes;
