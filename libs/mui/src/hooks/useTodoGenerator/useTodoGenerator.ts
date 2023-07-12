import _get from 'lodash.get';
import _set from 'lodash.set';
import dagre from 'dagre';
import { useMemo, useState } from 'react';
import type * as Appcraft from '@appcraft/types';

import * as Utils from './useTodoGenerator.utils';
import { DEFAULT_SIZE } from '../../styles';
import type * as Types from './useTodoGenerator.types';

const useTodoGenerator: Types.TodoGeneratorHook = (
  typeFile,
  todos,
  onChange
) => {
  const [editing, setEditing] = useState<Types.TodoState>(null);

  const { nodes, edges } = useMemo(() => {
    const dagreGraph = new dagre.graphlib.Graph()
      .setDefaultEdgeLabel(() => ({}))
      .setGraph({ rankdir: 'LRTB' });

    const nodes = Utils.getFlowNodes(todos || {}, ({ id }) =>
      dagreGraph.setNode(id, { ...DEFAULT_SIZE.DAGRE })
    );

    const edges = Utils.getFlowEdges(todos || {}, ({ source, target }) =>
      dagreGraph.setEdge(source, target)
    );

    dagre.layout(dagreGraph);

    return {
      edges,
      nodes: nodes.map((node) => {
        const nodeWithPosition = dagreGraph.node(node.id);

        return {
          ...node,
          position: {
            x: nodeWithPosition.x - DEFAULT_SIZE.NODE.width / 2,
            y: nodeWithPosition.y - DEFAULT_SIZE.NODE.height / 2,
          },
        };
      }),
    };
  }, [todos]);

  return [
    { editing, nodes, edges },

    {
      cancel: () => setEditing(null),

      change: (config) =>
        setEditing({ todo: editing?.todo as Appcraft.WidgetTodo, config }),

      create: (category) =>
        setEditing(Utils.getInitialTodo(typeFile, category)),

      select: (_e, { data }) => setEditing(Utils.getTodoState(typeFile, data)),

      connect: ({ source, sourceHandle, target }) => {
        if (
          source &&
          todos[source] &&
          source !== target &&
          edges.every((edge) => edge.target !== target)
        ) {
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

export default useTodoGenerator;
