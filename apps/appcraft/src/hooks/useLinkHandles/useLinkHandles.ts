import _get from 'lodash/get';
import { ExhibitorUtil } from '@appcraft/exhibitor';
import { useMemo, useState, useTransition } from 'react';
import type { FetchWrapperHandler, OutputData } from '@appcraft/exhibitor';

import { useCraftsmanFetch } from '../useCraftsmanFetch';
import type * as Types from './useLinkHandles.types';
import type { Links } from '../useNavValues';

export const useLinkHandles: Types.LinkHandlesHook = (
  layouts,
  links,
  getWidgetOptions,
  onChange
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

  const index = useMemo(() => {
    const result = links.findIndex(
      ({ layout, nodePaths, todoName }) =>
        active &&
        active.layoutid === layout &&
        active.todoName === todoName &&
        JSON.stringify(active.nodePaths) === JSON.stringify(nodePaths)
    );

    return typeof result === 'number' ? result : -1;
  }, [links, active]);

  return [
    {
      events,
      outputs: active?.outputs,
      active: !active
        ? undefined
        : {
            link: links[index],
            title: active.alias || active.todoName,
            subtitle: ExhibitorUtil.getPropPath([
              ...active.nodePaths,
              active.alias,
            ]),
          },
    },
    {
      back: () => setActive(undefined),

      add: () => {
        const { searchParams = [], ...link } = links[index] || {};

        links?.splice(index, 1, {
          ...link,
          searchParams: [...searchParams, { key: '', value: '' }],
        } as Links[number]);

        onChange([...links]);
      },

      params: (type, index, value) => {
        const { searchParams = [], ...link } = links[index];
        const params = searchParams[index];

        params[type] = value;
        links?.splice(index, 1, { ...link, searchParams } as Links[number]);

        onChange([...links]);
      },

      remove: (type, index) => {
        if (type === 'link') {
          const event = events[index];

          const i = links.findIndex(
            ({ layout, nodePaths, todoName }) =>
              event.layoutid === layout &&
              event.todoName === todoName &&
              JSON.stringify(event.nodePaths) === JSON.stringify(nodePaths)
          );

          links.splice(i, 1);
        } else if (type === 'params') {
          const { searchParams = [], ...link } = links[index];

          searchParams.splice(index, 1);
          links?.splice(index, 1, { ...link, searchParams } as Links[number]);
        }

        onChange([...links]);
      },

      resetable: (e) =>
        links.some(
          ({ layout, nodePaths, todoName }) =>
            e.layoutid === layout &&
            e.todoName === todoName &&
            JSON.stringify(e.nodePaths) === JSON.stringify(nodePaths)
        ),

      to: (e) => {
        if (active) {
          if (index >= 0) {
            links.splice(index, 1, {
              layout: active.layoutid,
              nodePaths: active.nodePaths,
              todoName: active.todoName,
              to: e.target.value,
            });
          } else {
            links.push({
              layout: active.layoutid,
              nodePaths: active.nodePaths,
              todoName: active.todoName,
              to: e.target.value,
            });
          }

          onChange([...links]);
        }
      },

      click: ({ layoutid, alias, nodePaths, todoName }) =>
        startTransition(() => {
          const layout = layouts.find(({ id }) => id === layoutid); //* 取得點擊目標所屬的 layout
          const template = _get(layout, ['template', ...nodePaths]); //* 依路徑取得對應的 template 設定
          const main = getWidgetOptions('template', layout.template.id); //* 主要的 main widget
          const widget = getWidgetOptions('template', template?.id); //* template 對應的 node widget
          const nodeKey = ExhibitorUtil.getPropPath(nodePaths); //* 轉換 node paths 為 path string
          const { [alias]: injection } = template?.todos || {}; //* 擷取 template 內的 todos

          //* 取得 node 實際的 prop name
          const nodePropName = nodeKey
            .substring(nodeKey.search(/(^nodes|\.nodes)\./g))
            .replace(/(^nodes|\.nodes)\./, '');

          //* 按 node prop name 取得對應的 state
          const nodeState = Object.entries(main?.state?.nodes || {}).find(
            ([todoPath, { alias }]) =>
              alias === nodePropName ||
              todoPath === ExhibitorUtil.getPropPath(['nodes', nodePropName])
          );

          //* 透過 ExhibitorUtil.getWidgetTodos 轉換出目標事件的 todos
          const { [todoName]: todos = {} } = ExhibitorUtil.getWidgetTodos({
            states: widget?.state?.todos,
            defaults: widget?.todos,
            injection: { [todoName]: injection },
            template: _get(nodeState, [1, 'template', 'todos']),
          });

          //* 執行事件，並取得 outputs 進行暫存
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
                alias,
                todoName,
                nodePaths,
                outputs,
              })
            );
        }),
    },
  ];
};
