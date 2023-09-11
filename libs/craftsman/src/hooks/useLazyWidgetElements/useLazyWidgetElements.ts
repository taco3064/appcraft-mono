import * as React from 'react';
import _get from 'lodash/get';
import { ExhibitorUtil } from '@appcraft/exhibitor';
import type * as Appcraft from '@appcraft/types';

import { getForceArray } from '../../utils';
import type { PropPaths } from '../../utils';
import type * as Types from './useLazyWidgetElements.types';

export const useLazyWidgetElements = <R>(
  widget: Appcraft.MainWidget,
  paths: PropPaths,
  version: string | undefined,
  fetchNodesAndEvents: Types.FetchNodesAndEvents,
  renderFn: Types.RenderFn<Appcraft.NodeAndEventProps, R>
) => {
  const path = ExhibitorUtil.getPropPath(paths);
  const ref = React.useRef({ fetchNodesAndEvents, renderFn });

  const [fetchPromise, setFetchPromise] =
    React.useState<Promise<Appcraft.NodeAndEventProps>>();

  const stringify = React.useMemo(() => {
    const items = getForceArray((!path ? widget : _get(widget, path)) || []);

    return JSON.stringify(
      items
        .reduce<string[]>((result, item) => {
          if (item.category === 'node') {
            result.push(
              JSON.stringify({
                typeFile: item.typeFile,
                typeName: item.typeName,
              })
            );
          }

          return result;
        }, [])
        .sort()
        .map((stringify) => JSON.parse(stringify))
    );
  }, [widget, path]);

  React.useImperativeHandle(ref, () => ({ fetchNodesAndEvents, renderFn }), [
    fetchNodesAndEvents,
    renderFn,
  ]);

  React.useEffect(() => {
    const { fetchNodesAndEvents } = ref.current;

    setFetchPromise(fetchNodesAndEvents(JSON.parse(stringify), version));
  }, [stringify, version]);

  return React.useMemo(
    () =>
      React.lazy(async () => {
        const { renderFn } = ref.current;
        const fetchData = await fetchPromise;

        return {
          default: (props: R) =>
            !fetchData ? null : renderFn?.({ ...props, fetchData }),
        };
      }),
    [fetchPromise]
  );
};
