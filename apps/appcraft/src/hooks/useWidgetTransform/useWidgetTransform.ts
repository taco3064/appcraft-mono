import _pick from 'lodash/pick';
import _set from 'lodash/set';
import { useQuery } from '@tanstack/react-query';
import type * as Appcraft from '@appcraft/types';

import { getConfigById, searchHierarchy } from '~appcraft/services';
import type * as Types from './useWidgetTransform.types';

export const useWidgetTransform: Types.WidgetTransformHook = (layout) => {
  const { template } = layout;
  const { id, props, todos } = template;

  const {
    data: [hierarchy],
  } = useQuery({
    enabled: Boolean(template.id),
    queryKey: ['widgets', { type: 'item', targets: [template.id] }],
    queryFn: searchHierarchy,
    refetchOnWindowFocus: false,
  });

  return [
    {
      category: 'node',
      description: hierarchy.description,
      id,
      type: hierarchy.name,
      typeFile: 'widget',
      typeName: id,
      state: {},
      props,
      todos,
      nodes: {},
    },

    {
      onFetchDefinition: async ({ typeName: id }) => {
        const { content: widget } = await getConfigById<Appcraft.MainWidget>(
          id
        );
        const { state } = widget;

        return {
          type: 'exact',
          options: Object.entries(state?.props || {}).reduce(
            (result, [path, { alias, type, options }]) => ({
              ...result,
              ...(type === 'public' && {
                [alias || path]: options,
              }),
            }),
            {}
          ),
        } as Appcraft.StructureProp;
      },

      onFetchNodesAndEvents: async (options) => {
        const result: Appcraft.NodeAndEventProps = { nodes: {}, events: {} };

        for await (const data of options.map(async ({ typeFile, typeName }) => {
          const { content: widget } = await getConfigById<Appcraft.MainWidget>(
            typeName
          );

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
