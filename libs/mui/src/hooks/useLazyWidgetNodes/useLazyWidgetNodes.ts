import { lazy, useImperativeHandle, useMemo, useRef } from 'react';
import type * as Appcraft from '@appcraft/types';

import { getNodesAndEvents } from '../../services';
import type * as Types from './useLazyWidgetNodes.types';

const useLazyWidgetNodes = <R>(
  fetchOptions: Appcraft.FetchOptions,
  items: Appcraft.WidgetOptions[],
  version: string | undefined,
  renderFn: Types.RenderFn<Appcraft.NodeAndEventProps, R>
) => {
  const renderRef = useRef(renderFn);

  useImperativeHandle(renderRef, () => renderFn, [renderFn]);

  return useMemo(
    () =>
      lazy(async () => {
        const fetchData = await getNodesAndEvents(fetchOptions, items, version);

        return {
          default: (props: R) =>
            renderRef.current({ ...props, fetchData, widgets: items }),
        };
      }),
    [fetchOptions, items, version]
  );
};

export default useLazyWidgetNodes;
