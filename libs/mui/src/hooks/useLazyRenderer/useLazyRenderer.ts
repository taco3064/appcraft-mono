import _get from 'lodash/get';
import { lazy, useMemo, useRef } from 'react';
import type * as Appcraft from '@appcraft/types';

import { getForceArray } from '../../utils';
import type * as Types from './useLazyRenderer.types';
import type { FetchWrapperHandler } from '../useRender';
import type { RendererOptions, WidgetMap } from '../useRendererState';

const useLazyRenderer = (() => {
  const fetchWidgets: Types.FetchWidgets = async (
    widgets,
    onFetchWidget,
    templates = new Map()
  ) => {
    const next: Appcraft.RootNodeWidget[] = [];

    const news = widgets.reduce<Promise<Types.WidgetInfo>[]>((acc, widget) => {
      const state = _get(widget, ['state', 'nodes']) || {};

      Object.values(state).forEach(({ template }) => {
        if (template?.id && !templates.has(template.id)) {
          acc.push(
            onFetchWidget('widget', template.id).then((widget) => ({
              id: template.id,
              widget,
            }))
          );
        }
      });

      return acc;
    }, []);

    for await (const { id, widget } of news) {
      templates.set(id, { ...widget, template: {} });
      next.push(widget);
    }

    return !next.length
      ? templates
      : await fetchWidgets(next, onFetchWidget, templates);
  };

  return <R>(
    options: RendererOptions,
    fetchWidgetWrapper: FetchWrapperHandler<'widget'>,
    renderer: Appcraft.LazyRenderer<WidgetMap, R>
  ) => {
    const fetchRef = useRef(fetchWidgetWrapper);
    const renderRef = useRef(renderer);

    const widgets = useMemo(
      () =>
        new Map<string, Appcraft.RootNodeWidget>(
          getForceArray(
            !Array.isArray(options)
              ? options
              : options.map(({ widget }) => widget)
          ).map((widget) => [widget.id, widget])
        ),
      [options]
    );

    return useMemo(
      () =>
        lazy(async () => {
          const fetchData = await fetchWidgets(
            Array.from(widgets.values()),
            fetchRef.current
          );

          return {
            default: (props: R) => renderRef.current({ ...props, fetchData }),
          };
        }),
      [widgets]
    );
  };
})();

export default useLazyRenderer;
