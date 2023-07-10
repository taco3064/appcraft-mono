import type * as Appcraft from '@appcraft/types';
import type { Edge, Node } from 'reactflow';
import type { MouseEvent } from 'react';

import type { ChangeHandler } from '../../contexts';

export type TodoState = {
  todo: Appcraft.WidgetTodo;
  config: Appcraft.ConfigOptions;
} | null;

export type TodoEdge = Edge<never>;
export type TodoNode = Node<Appcraft.WidgetTodo>;

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
  todos?: Record<string, Appcraft.WidgetTodo>
) => [
  { editing: TodoState; edges: TodoEdge[]; nodes: TodoNode[] },
  {
    cancel: () => void;
    change: ChangeHandler<Appcraft.ConfigOptions>;
    create: <T extends Appcraft.WidgetTodo>(category: T['category']) => void;
    select: (e: MouseEvent, node: TodoNode) => void;
  }
];
