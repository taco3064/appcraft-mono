import _get from 'lodash/get';
import { ExhibitorUtil } from '@appcraft/exhibitor';
import { lazy, useImperativeHandle, useMemo, useRef } from 'react';
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
  const fetchRef = useRef(fetchNodesAndEvents);
  const renderRef = useRef(renderFn);
  const path = ExhibitorUtil.getPropPath(paths);

  const options = useMemo(() => {
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

  useImperativeHandle(renderRef, () => renderFn, [renderFn]);

  return useMemo(
    () =>
      lazy(async () => {
        const fetchData = await fetchRef.current(JSON.parse(options), version);

        return {
          default: (props: R) => renderRef.current?.({ ...props, fetchData }),
        };
      }),
    [options, version]
  );
};
