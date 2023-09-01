import _pick from 'lodash/pick';
import _set from 'lodash/set';
import { CraftsmanUtil } from '@appcraft/craftsman';
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import type * as Appcraft from '@appcraft/types';

import * as Service from '~appcraft/services';
import type * as Types from './useWidgetTransform.types';
import type { HierarchyData } from '~appcraft/services';

const extractTemplateIds: Types.ExtractTemplateIds = ({ id, nodes }) =>
  Object.values(nodes || {}).reduce(
    (result, template) => {
      CraftsmanUtil.getForceArray(template).forEach((template) =>
        result.push(...extractTemplateIds(template))
      );

      return result;
    },
    [id]
  );

const convertToNodes: Types.ConvertToNodes = (nodes) =>
  Object.entries(nodes || {}).reduce((result, [path, widget]) => {
    if (!Array.isArray(widget) && widget?.category === 'node') {
      const { typeName: id, props, todos, nodes = {} } = widget;

      result[path] = {
        id,
        props,
        todos,
        nodes: convertToNodes(nodes),
      };
    }

    return result;
  }, {});

const convertToWidget: Types.ConvertToWidget = (
  hierarchies,
  { id, nodes, props, todos }
) => {
  const hierarchy = hierarchies.get(id);

  return (
    hierarchy && {
      category: 'node',
      description: hierarchy.description,
      id,
      type: hierarchy.name,
      typeFile: 'widget',
      typeName: id,
      state: {},
      props,
      todos,
      nodes: Object.entries(nodes || {}).reduce(
        (result, [path, template]) => ({
          ...result,
          [path]: convertToWidget(hierarchies, template),
        }),
        {}
      ),
    }
  );
};

export const useWidgetTransform: Types.WidgetTransformHook = (
  layout,
  { onChange, onClose }
) => {
  const { template } = layout;
  const targets = useMemo(() => extractTemplateIds(template), [template]);

  const { data } = useQuery({
    enabled: Boolean(template.id),
    queryKey: ['widgets', { type: 'item', targets }],
    queryFn: Service.searchHierarchy,
    refetchOnWindowFocus: false,
  });

  const hierarchies = useMemo(
    () =>
      new Map<string, HierarchyData<string>>(
        data?.map((hierarchy) => [hierarchy._id, hierarchy])
      ),
    [data]
  );

  return [
    convertToWidget(hierarchies, template),

    {
      onWidgetChange: (e) => {
        const { nodes, props, todos } = e || {};

        const value = {
          ...(e && {
            ...template,
            props,
            todos,
            nodes: convertToNodes(nodes),
          }),
        };

        !e && onClose?.();
        onChange({ ..._set(layout, ['template'], value) });
      },

      onFetchDefinition: async (options) => {
        const { typeFile, typeName: id } = options;

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
            ..._pick(widget.state, ['nodes', 'todos']),
            widgetKey: `${typeFile}#${typeName}`,
          };
        })) {
          const { widgetKey, nodes, todos } = data;

          _set(
            result,
            ['events', widgetKey],
            Object.entries(todos || {}).map(
              ([path, { alias }]) => alias || path
            )
          );

          Object.entries(nodes || {}).forEach(([path, { alias, type }]) => {
            if (type === 'public') {
              _set(result, ['nodes', widgetKey, alias || path], 'element');
            }
          });
        }

        return result;
      },
    },
  ];
};
