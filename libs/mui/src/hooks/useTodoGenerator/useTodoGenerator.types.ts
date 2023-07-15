import type * as Appcraft from '@appcraft/types';
import type { ReactFlowProps } from 'reactflow';
import type { MouseEvent } from 'react';

import type { ChangeHandler } from '../../contexts';
import type { TodoEdge, TodoNode, TodoState } from '../../utils';

export type TodoChangeHandler = (
  values: Record<string, Appcraft.WidgetTodo>
) => void;

export type TodoGeneratorHook = (
  typeFile: string,
  todos: Record<string, Appcraft.WidgetTodo>,
  onChange: TodoChangeHandler
) => [
  { editing: TodoState; edges: TodoEdge[]; nodes: TodoNode[] },
  {
    cancel: () => void;
    change: ChangeHandler<Appcraft.ConfigOptions>;
    connect: ReactFlowProps['onConnect'];
    create: <T extends Appcraft.WidgetTodo>(category: T['category']) => void;
    deleteEdge: ReactFlowProps['onEdgeDoubleClick'];
    deleteNode: ReactFlowProps['onNodesDelete'];
    select: (e: MouseEvent, node: TodoNode) => void;
  }
];
