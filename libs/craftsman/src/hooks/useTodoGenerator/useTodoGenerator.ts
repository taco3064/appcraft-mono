import _get from 'lodash/get';
import _set from 'lodash/set';
import dagre from 'dagre';
import { useMemo, useState } from 'react';
import type * as Appcraft from '@appcraft/types';

import * as Util from '../../utils';
import { DEFAULT_SIZE } from '../../styles';
import type * as Types from './useTodoGenerator.types';

export const useTodoGenerator: Types.TodoGeneratorHook = (
  typeFile,
  todos,
  { onChange, onEditToggle }
) => {
  const [editing, setEditing] = useState<Util.EditingTodo>(null);

  const { nodes, edges } = useMemo(() => {
    const dagreGraph = new dagre.graphlib.Graph()
      .setDefaultEdgeLabel(() => ({}))
      .setGraph({ rankdir: 'TB', align: 'UL', ranker: 'longest-path' });

    const nodes = Util.getFlowNodes(todos || {}, ({ id }) =>
      dagreGraph.setNode(id, { ...DEFAULT_SIZE.DAGRE })
    );

    const edges = Util.getFlowEdges(todos || {}, ({ source, target }) =>
      dagreGraph.setEdge(source, target)
    );

    dagre.layout(dagreGraph);

    return {
      edges,
      nodes: nodes.map((node) => {
        const { x, y } = dagreGraph.node(node.id);

        return { ...node, position: { x, y } };
      }),
    };
  }, [todos]);

  return [
    { editing, nodes, edges },

    {
      cancel: () => {
        setEditing(null);
        onEditToggle?.(false);
      },

      change: (config) =>
        setEditing({ todo: editing?.todo as Appcraft.WidgetTodo, config }),

      create: (category) => setEditing(Util.getInitialTodo(typeFile, category)),

      select: (_e, { data }) => {
        setEditing(Util.getEditingTodo(typeFile, data));
        onEditToggle?.(true);
      },

      connect: ({ source, sourceHandle, target }) => {
        if (source && todos[source] && source !== target) {
          onChange({
            ...todos,
            [source]: {
              ...todos[source],
              [sourceHandle as string]: target || null,
            },
          } as never);
        }
      },

      deleteEdge: (_e, { source, sourceHandle }) => {
        if (todos?.[source]) {
          onChange({
            ...todos,
            [source]: {
              ...todos[source],
              [sourceHandle as string]: null,
            },
          } as never);
        }
      },

      deleteNode: (nodes) => {
        if (todos) {
          nodes.forEach(({ id }) => {
            delete todos[id];

            edges.forEach(({ source, sourceHandle }) => {
              if (sourceHandle && id === _get(todos, [source, sourceHandle])) {
                _set(todos, [source, sourceHandle], '');
              }
            });
          });
        }

        onChange({ ...todos } as never);
      },
    },
  ];
};
