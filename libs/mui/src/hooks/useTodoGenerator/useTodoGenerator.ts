import dagre from 'dagre';
import { useMemo, useState } from 'react';
import type * as Appcraft from '@appcraft/types';

import * as Utils from './useTodoGenerator.utils';
import { DEFAULT_NODE_SIZE } from '../../styles';
import type * as Types from './useTodoGenerator.types';

const useTodoGenerator: Types.TodoGeneratorHook = (typeFile, todos) => {
  const [editing, setEditing] = useState<Types.TodoState>(null);

  return [
    {
      editing,

      ...useMemo(() => {
        const dagreGraph = new dagre.graphlib.Graph()
          .setDefaultEdgeLabel(() => ({}))
          .setGraph({
            rankdir: 'TB',
          });

        const nodes = Utils.getFlowNodes(todos || {}, ({ id }) =>
          dagreGraph.setNode(id, { ...DEFAULT_NODE_SIZE })
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
                x: nodeWithPosition.x - DEFAULT_NODE_SIZE.width / 2,
                y: nodeWithPosition.y - DEFAULT_NODE_SIZE.height / 2,
              },
            };
          }),
        };
      }, [todos]),
    },
    {
      cancel: () => setEditing(null),

      change: (config) =>
        setEditing({ todo: editing?.todo as Appcraft.WidgetTodo, config }),

      create: (category) =>
        setEditing(Utils.getInitialTodo(typeFile, category)),

      select: (_e, { data }) => setEditing(Utils.getTodoState(typeFile, data)),
    },
  ];
};

export default useTodoGenerator;
