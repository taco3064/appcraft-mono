import _get from 'lodash/get';
import { ExhibitorUtil } from '@appcraft/exhibitor';
import { useMemo } from 'react';
import type { TodosState } from '@appcraft/types';

import type { LayoutLinksHook, LinkData } from './useLayoutLinks.types';

export const useLayoutLinks: LayoutLinksHook = (
  { links, ...layout },
  onChange
) => {
  const map = useMemo<Map<string, LinkData>>(
    () => new Map(Object.entries(links || {})),
    [links]
  );

  return [
    map,
    (path, { widgetPaths, widget }) => {
      if (map.has(path)) {
        map.delete(path);
      } else {
        const target = widgetPaths.length ? _get(widget, widgetPaths) : widget;

        const todoStates: Record<string, TodosState> =
          _get(target, ['state', 'todos']) || {};

        const todoName = path
          .substring(path.search(/(^todos|\.todos)\./g))
          .replace(/(^todos|\.todos)\./, '');

        const state = Object.entries(todoStates).find(
          ([todoPath, { alias }]) =>
            alias === todoName ||
            todoPath === ExhibitorUtil.getPropPath(['todos', todoName])
        );

        state &&
          map.set(path, {
            widgetPaths,
            todoName,
            stateKey: state[0],
            alias: state[1].alias,
          });
      }

      onChange({ ...layout, links: Object.fromEntries(map.entries()) });
    },
  ];
};
