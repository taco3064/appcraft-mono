import dagre from 'dagre';
import { useMemo, useState } from 'react';
import type * as Appcraft from '@appcraft/types';

import * as Utils from './useTodoGenerator.utils';
import type * as Types from './useTodoGenerator.types';

const DEFAULT_SIZE = { width: 120, height: 30 };
const dagreGraph = new dagre.graphlib.Graph();

dagreGraph.setDefaultEdgeLabel(() => ({}));
dagreGraph.setGraph({ rankdir: 'TB' });

const useTodoGenerator: Types.TodoGeneratorHook = (typeFile, todos) => {
  const [editing, setEditing] = useState<Types.TodoState>(null);

  return [
    {
      editing,

      ...useMemo(() => {
        const nodes = Utils.getFlowNodes(todos || {}, ({ id }) =>
          dagreGraph.setNode(id, { ...DEFAULT_SIZE })
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
                x: nodeWithPosition.x - DEFAULT_SIZE.width / 2,
                y: nodeWithPosition.y - DEFAULT_SIZE.height / 2,
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

      connect: (params) => console.log(params),

      create: (category) =>
        setEditing(Utils.getInitialTodo(typeFile, category)),
    },
  ];
};

export default useTodoGenerator;
