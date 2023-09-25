import _get from 'lodash/get';
import { ExhibitorUtil } from '@appcraft/exhibitor';
import { useMemo, useState, useTransition } from 'react';
import type { FetchWrapperHandler, OutputData } from '@appcraft/exhibitor';

import { useCraftsmanFetch } from '../useCraftsmanFetch';
import type * as Types from './useLinkHandles.types';

export const useLinkHandles: Types.LinkHandlesHook = (
  layouts,
  getWidgetOptions
) => {
  const [, startTransition] = useTransition();
  const [active, setActive] = useState<Types.ActiveEvent>();
  const handleFetch = useCraftsmanFetch();

  const events = useMemo(
    () =>
      layouts.reduce<Types.LinkEvent[]>((result, { id, links }) => {
        result.push(
          ...Object.entries(links || {}).map(
            ([todoPath, { alias, todoName, widgetPaths }]) => ({
              layoutid: id,
              alias,
              todoName,
              todoPath,
              nodePaths: widgetPaths,
              outputs: [],
            })
          )
        );

        return result;
      }, []),
    [layouts]
  );

  return [
    { events, outputs: active?.outputs },
    {
      click: ({ layoutid, alias, nodePaths, todoName }) =>
        startTransition(() => {
          const layout = layouts.find(({ id }) => id === layoutid);
          const template = _get(layout, ['template', ...nodePaths]);
          const main = getWidgetOptions('template', layout.template.id);
          const widget = getWidgetOptions('template', template?.id);
          const nodeKey = ExhibitorUtil.getPropPath(nodePaths);
          const { [alias]: injection } = template?.todos || {};

          const nodePropName = nodeKey
            .substring(nodeKey.search(/(^nodes|\.nodes)\./g))
            .replace(/(^nodes|\.nodes)\./, '');

          const nodeState = Object.entries(main?.state?.nodes || {}).find(
            ([todoPath, { alias }]) =>
              alias === nodePropName ||
              todoPath === ExhibitorUtil.getPropPath(['nodes', nodePropName])
          );

          const { [todoName]: todos = {} } = ExhibitorUtil.getWidgetTodos({
            states: widget?.state?.todos,
            defaults: widget?.todos,
            injection: { [todoName]: injection },
            template: _get(nodeState, [1, 'template', 'todos']),
          });

          ExhibitorUtil.getEventHandlers(todos, {
            eventName: todoName,
            onFetchData: handleFetch.data,
            onFetchTodoWrapper: (todoid) =>
              (handleFetch.wrapper as FetchWrapperHandler<'todo'>)(
                'todo',
                todoid
              ),
          })
            .reduce(
              (promise, handler) =>
                promise.then((outputs) =>
                  handler({ [ExhibitorUtil.OUTPUTS_SYMBOL]: outputs })
                ),
              Promise.resolve<OutputData[]>([])
            )
            .then((outputs) =>
              setActive({
                layoutid,
                todoName,
                nodePaths,
                outputs,
              })
            );
        }),
    },
  ];
};
