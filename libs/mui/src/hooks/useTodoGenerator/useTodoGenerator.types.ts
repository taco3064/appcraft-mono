import type * as Appcraft from '@appcraft/types';
import type { Edge, Node, OnConnect } from 'reactflow';

import type { ChangeHandler } from '../../contexts';

export type TodoState = {
  todo: Appcraft.WidgetTodo;
  config: Appcraft.ConfigOptions;
} | null;

export type TodoEdge = Edge<never>;
export type TodoNode = Node<{ label?: string; metadata: Appcraft.WidgetTodo }>;

export type GetInitialTodoUtil = (
  typeFile: string,
  category: Appcraft.WidgetTodo['category']
) => TodoState;

export type GetFlowNodesUtil = (
  todos: Record<string, Appcraft.WidgetTodo>,
  each?: (node: TodoNode) => void
) => TodoNode[];

export type GetFlowEdgesUtil = (
  todos: Record<string, Appcraft.WidgetTodo>,
  each?: (edge: TodoEdge) => void
) => TodoEdge[];

export type TodoGeneratorHook = (
  typeFile: string,
  todos?: Record<string, Appcraft.WidgetTodo>
) => [
  { editing: TodoState; edges: TodoEdge[]; nodes: TodoNode[] },
  {
    cancel: () => void;
    change: ChangeHandler<Appcraft.ConfigOptions>;
    create: <T extends Appcraft.WidgetTodo>(category: T['category']) => void;
    connect: OnConnect;
  }
];
