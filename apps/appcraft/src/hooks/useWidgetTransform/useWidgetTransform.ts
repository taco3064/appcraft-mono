import _has from 'lodash/has';
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

const convertToNodes: Types.ConvertToNodes = (
  nodes,
  templateIds,
  getWidgetOptions
) =>
  Object.entries(nodes || {}).reduce((result, [path, widget]) => {
    if (!Array.isArray(widget) && widget?.category === 'node') {
      const { typeFile, typeName, props, todos, nodes = {} } = widget;

      result[path] = {
        props,
        todos,
        nodes: convertToNodes(nodes, templateIds, getWidgetOptions),
        id: templateIds.find((id) => {
          const target = getWidgetOptions('template', id);

          return target?.typeFile === typeFile && target?.typeName === typeName;
        }),
      };
    }

    return result;
  }, {});

const convertToWidget: Types.ConvertToWidget = (
  hierarchies,
  { id, nodes, props, todos },
  getWidgetOptions
) => {
  const widget = getWidgetOptions('template', id);
  const hierarchy = hierarchies.get(id);

  return (
    hierarchy && {
      ...widget,
      category: 'node',
      description: hierarchy.description,
      id,
      type: hierarchy.name,
      props,
      todos,
      nodes: Object.entries(nodes || {}).reduce(
        (result, [path, template]) => ({
          ...result,
          [path]: convertToWidget(hierarchies, template, getWidgetOptions),
        }),
        {}
      ),
    }
  );
};

export const useWidgetTransform: Types.WidgetTransformHook = (
  layout,
  { getWidgetOptions, onChange, onClose }
) => {
  const { template } = layout;
  const templateIds = useMemo(() => extractTemplateIds(template), [template]);

  const { data } = useQuery({
    enabled: Boolean(template.id),
    queryKey: ['widgets', { type: 'item', targets: templateIds }],
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
    convertToWidget(hierarchies, template, getWidgetOptions),

    {
      onWidgetChange: (e) => {
        const { nodes, props, todos } = e || {};

        const value = {
          ...(e && {
            ...template,
            props,
            todos,
            nodes: convertToNodes(nodes, templateIds, getWidgetOptions),
          }),
        };

        !e && onClose?.();
        onChange({ ..._set(layout, ['template'], value) });
      },

      onFetchDefinition: async (options) => {
        const { typeFile, collectionPath } = options;
        const widget = getWidgetOptions('type', options);
        const { state } = widget || {};

        if (
          typeFile === __WEBPACK_DEFINE__.TODO_TYPE_FILE ||
          _has(widget, [
            'state',
            'todos',
            `todos.${collectionPath.replace(/\.params.+/, '')}`,
          ])
        ) {
          return Service.getTypeDefinition(options);
        }

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

        for (const data of options.map((opts) => {
          const widget = getWidgetOptions('type', opts);

          return {
            ..._pick(widget?.state, ['nodes', 'todos']),
            widgetKey: `${opts.typeFile}#${opts.typeName}`,
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
