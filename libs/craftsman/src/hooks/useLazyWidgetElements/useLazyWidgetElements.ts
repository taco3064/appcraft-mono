import _get from 'lodash/get';
import { lazy, useImperativeHandle, useMemo, useRef } from 'react';
import type * as Appcraft from '@appcraft/types';

import { getForceArray, getPropPath } from '../../utils';
import type { PropPaths } from '../../utils';
import type * as Types from './useLazyWidgetElements.types';

const useLazyWidgetElements = <R>(
  widget: Appcraft.RootNodeWidget,
  paths: PropPaths,
  version: string | undefined,
  fetchNodesAndEvents: Types.FetchNodesAndEvents,
  renderFn: Types.RenderFn<Appcraft.NodeAndEventProps, R>
) => {
  const fetchRef = useRef(fetchNodesAndEvents);
  const renderRef = useRef(renderFn);
  const path = getPropPath(paths);

  const options = useMemo(() => {
    const items = getForceArray((!path ? widget : _get(widget, path)) || []);

    return items
      .reduce<string[]>((result, item) => {
        if (item.category === 'node') {
          result.push(
            JSON.stringify({ typeFile: item.typeFile, typeName: item.typeName })
          );
        }

        return result;
      }, [])
      .sort();
  }, [widget, path]);

  useImperativeHandle(renderRef, () => renderFn, [renderFn]);

  return useMemo(
    () =>
      lazy(async () => {
        const fetchData = await fetchRef.current(
          options.map<Types.ParseOptions>((option) => JSON.parse(option)),
          version
        );

        return {
          default: (props: R) => renderRef.current?.({ ...props, fetchData }),
        };
      }),
    [options, version]
  );
};

export default useLazyWidgetElements;
