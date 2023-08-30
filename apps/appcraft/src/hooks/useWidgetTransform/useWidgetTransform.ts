import _pick from 'lodash/pick';
import _set from 'lodash/set';
import { useQuery } from '@tanstack/react-query';
import type * as Appcraft from '@appcraft/types';

import * as Service from '~appcraft/services';
import type * as Types from './useWidgetTransform.types';

export const useWidgetTransform: Types.WidgetTransformHook = (layout) => {
  const { template } = layout;
  const { id, props, todos } = template;

  const { data } = useQuery({
    enabled: Boolean(template.id),
    queryKey: ['widgets', { type: 'item', targets: [template.id] }],
    queryFn: Service.searchHierarchy,
    refetchOnWindowFocus: false,
  });

  return [
    data?.[0] && {
      category: 'node',
      description: data[0].description,
      id,
      type: data[0].name,
      typeFile: 'widget',
      typeName: id,
      state: {},
      props,
      todos,
      nodes: {},
    },

    {
      onFetchDefinition: async (options) => {
        const { typeFile } = options;

        if (typeFile === __WEBPACK_DEFINE__.TODO_TYPE_FILE) {
          return Service.getTypeDefinition(options);
        }

        const { content: widget } =
          await Service.getConfigById<Appcraft.MainWidget>(id);

        const { state } = widget;

        return {
          type: 'exact',
          options: Object.entries(state?.props || {}).reduce(
            (result, [path, { alias, type, options }]) => ({
              ...result,
              ...(type === 'public' && {
                [alias || path]: { ...options, propName: alias || path },
              }),
            }),
            {}
          ),
        } as Appcraft.StructureProp;
      },

      onFetchNodesAndEvents: async (options) => {
        const result: Appcraft.NodeAndEventProps = { nodes: {}, events: {} };

        for await (const data of options.map(async ({ typeFile, typeName }) => {
          const { content: widget } =
            await Service.getConfigById<Appcraft.MainWidget>(typeName);

          return {
            ..._pick(widget.state, ['todos']),
            widgetKey: `${typeFile}#${typeName}`,
          };
        })) {
          const { widgetKey, todos } = data;

          _set(
            result,
            ['events', widgetKey],
            Object.entries(todos || {}).map(
              ([path, { alias }]) => alias || path
            )
          );
        }

        return result;
      },
    },
  ];
};
