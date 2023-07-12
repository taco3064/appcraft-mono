import type * as Appcraft from '@appcraft/types';
import type { Edge, Node, ReactFlowProps } from 'reactflow';
import type { MouseEvent } from 'react';

import type { ChangeHandler } from '../../contexts';

export type TodoState = {
  todo: Appcraft.WidgetTodo;
  config: Appcraft.ConfigOptions;
} | null;

export type TodoEdge = Edge<never>;
export type TodoNode = Node<Appcraft.WidgetTodo>;

export type TodoChangeHandler = (
  values: Record<string, Appcraft.WidgetTodo>
) => void;

//* Util Functions
export type GetInitialTodoUtil = (
  typeFile: string,
  category: Appcraft.WidgetTodo['category']
) => TodoState;

export type GetTodoStateUtil = (
  typeFile: string,
  todo: Appcraft.WidgetTodo
) => TodoState;

export type GetFlowNodesUtil = (
  todos: Record<string, Appcraft.WidgetTodo>,
  each?: (node: TodoNode) => void
) => TodoNode[];

export type GetFlowEdgesUtil = (
  todos: Record<string, Appcraft.WidgetTodo>,
  each?: (edge: TodoEdge) => void
) => TodoEdge[];

//* Custom Hooks
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
