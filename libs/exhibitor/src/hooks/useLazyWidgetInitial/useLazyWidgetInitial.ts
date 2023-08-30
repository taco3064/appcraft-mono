import _get from 'lodash/get';
import { lazy, useMemo, useRef } from 'react';
import type * as Appcraft from '@appcraft/types';

import type * as Types from './useLazyWidgetInitial.types';
import type { FetchWrapperHandler } from '../useComposerRender';
import type { RendererOptions, WidgetMap } from '../../utils';

const extractTemplateIds: Types.ExtractTemplateIds = (widgets) =>
  Array.from(
    widgets.reduce((result, widget) => {
      const state = _get(widget, ['state', 'nodes']) || {};

      Object.values(state).forEach(({ template }) => {
        if (template?.id) {
          result.add(template.id);
        }
      });

      return result;
    }, new Set<string>())
  );

const fetchWidgets: Types.FetchWidgets = async (
  templateIds,
  onFetchWidget,
  templates = new Map()
) => {
  const next: Appcraft.MainWidget[] = [];

  const appended = templateIds.reduce<Promise<Types.WidgetInfo>[]>(
    (acc, id) => {
      if (!templates.has(id)) {
        acc.push(
          onFetchWidget('widget', id).then((widget) => ({
            id,
            widget,
          }))
        );
      }

      return acc;
    },
    []
  );

  for await (const { id, widget } of appended) {
    templates.set(id, { ...widget, template: {} });
    next.push(widget);
  }

  return !next.length
    ? templates
    : await fetchWidgets(extractTemplateIds(next), onFetchWidget, templates);
};

export const useLazyWidgetInitial = <R>(
  options: RendererOptions,
  fetchWidgetWrapper: FetchWrapperHandler<'widget'>,
  renderer: Appcraft.LazyRenderer<WidgetMap, R>
) => {
  const fetchRef = useRef(fetchWidgetWrapper);
  const renderRef = useRef(renderer);

  const stringify = useMemo(
    () =>
      JSON.stringify(
        !Array.isArray(options)
          ? extractTemplateIds([options])
          : Array.from(
              options.reduce((result, { template }) => {
                if (template?.id) {
                  result.add(template.id);
                }

                return result;
              }, new Set<string>())
            )
      ),
    [options]
  );

  return useMemo(
    () =>
      lazy(async () => {
        const fetchData = await fetchWidgets(
          JSON.parse(stringify),
          fetchRef.current
        );

        return {
          default: (props: R) => renderRef.current({ ...props, fetchData }),
        };
      }),
    [stringify]
  );
};
