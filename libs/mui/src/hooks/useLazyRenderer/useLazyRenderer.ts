import _get from 'lodash/get';
import { lazy, useMemo, useRef, useState, useTransition } from 'react';
import type * as Appcraft from '@appcraft/types';

import { getForceArray } from '../../utils';
import type * as Types from './useLazyRenderer.types';
import type { Templates } from '../common';

const useLazyRenderer: Types.LazyRendererHook = (() => {
  const fetchWidgets: Types.FetchWidgets = async (
    widgets,
    onFetchWidget,
    templates = new Map<string, Appcraft.RootNodeWidget>()
  ) => {
    const next: Appcraft.RootNodeWidget[] = [];

    const news = widgets.reduce<Promise<Appcraft.RootNodeWidget>[]>(
      (acc, widget) => {
        const state = _get(widget, ['state', 'nodes']) || {};

        Object.values(state).forEach(({ template }) => {
          if (template?.id && !templates.has(template.id)) {
            acc.push(onFetchWidget(template.id));
          }
        });

        return acc;
      },
      []
    );

    for await (const widget of news) {
      templates.set(widget.id, widget);
      next.push(widget);
    }

    return !next.length
      ? templates
      : await fetchWidgets(next, onFetchWidget, templates);
  };

  return (options, onFetchWidget) => {
    const fetchRef = useRef(onFetchWidget);
    const [, startTransition] = useTransition();
    const [templates, setTemplates] = useState<Templates>(new Map());

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

    return {
      templates,

      LazyRenderer: useMemo(
        () =>
          lazy(async () => {
            const templates = await fetchWidgets(
              Array.from(widgets.values()),
              fetchRef.current
            );

            startTransition(() => setTemplates(templates));

            return { default: ({ children }) => children };
          }),
        [widgets]
      ),
    };
  };
})();

export default useLazyRenderer;
