import _get from 'lodash/get';
import { lazy, useEffect, useMemo, useRef, useState } from 'react';
import type * as Appcraft from '@appcraft/types';

import type * as Types from './useLazyWidgetNav.types';

//* Methods
const getTemplateIds: Types.GetTemplateIdsFn = (getBy, sources) =>
  Array.from(
    sources.reduce((result, source) => {
      if (getBy === 'layout') {
        const { id, nodes } = source;

        result.add(id);

        getTemplateIds('layout', Object.values(nodes || {}).flat()).forEach(
          (id) => result.add(id)
        );
      } else if (getBy === 'state') {
        const state =
          _get(source as Appcraft.MainWidget, ['state', 'nodes']) || {};

        Object.values(state).forEach(({ template }) => {
          if (template?.id) {
            result.add(template.id);
          }
        });
      }

      return result;
    }, new Set<string>())
  );

const fetchWidgets: Types.FetchWidgets = async (
  templateIds,
  onFetchWidget,
  records = new Map() as Types.WidgetNav
) => {
  const widgets: Appcraft.MainWidget[] = [];

  const exists = new Set<string>(
    Array.from(records.values()).map(({ id }) => id)
  );

  for (const id of templateIds.filter((id) => !exists.has(id))) {
    const widget = await onFetchWidget('widget', id);

    records.set(widget.id, { id, widget });
    widgets.push(widget);
  }

  return !widgets.length
    ? records
    : fetchWidgets(getTemplateIds('state', widgets), onFetchWidget, records);
};

//* Custom Hooks
export function useLazyWidgetNav<R>(
  ...[options, fetchWidgetWrapper, renderer]: Types.LazyWidgetNavArgs<R>
) {
  const [fetchPromise, setFetchPromise] = useState<Promise<Types.WidgetNav>>();
  const ref = useRef({ fetchWidgetWrapper, renderer });

  const stringify = useMemo(
    () =>
      JSON.stringify(
        !options
          ? []
          : !Array.isArray(options)
          ? getTemplateIds('state', [options])
          : getTemplateIds(
              'layout',
              options.map(({ template }) => template)
            )
      ),
    [options]
  );

  useEffect(() => {
    const { fetchWidgetWrapper } = ref.current;

    setFetchPromise(fetchWidgets(JSON.parse(stringify), fetchWidgetWrapper));
  }, [stringify]);

  return useMemo(
    () =>
      lazy(async () => {
        const { renderer } = ref.current;
        const nav = (await fetchPromise) || (new Map() as Types.WidgetNav);

        return {
          default: (props: R) =>
            renderer({
              ...props,
              fetchData: (getBy, id) =>
                (getBy === 'widget'
                  ? nav.get(id)
                  : Array.from(nav.values()).find((item) => item.id === id)
                )?.widget,
            }),
        };
      }),
    [fetchPromise]
  );
}
