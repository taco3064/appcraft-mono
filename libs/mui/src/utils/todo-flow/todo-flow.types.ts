import type * as Appcraft from '@appcraft/types';
import type { Edge, Node } from 'reactflow';

//* Variables
export type TodoState = {
  todo: Omit<Appcraft.WidgetTodo, 'mixedTypes'>;
  config: Appcraft.ConfigOptions;
} | null;

export type TodoEdge = Edge<never>;
export type TodoNode = Node<Appcraft.WidgetTodo>;

//* Methods
export type GetInitialTodo = (
  typeFile: string,
  category: Appcraft.WidgetTodo['category']
) => TodoState;

export type GetTodoState = (
  typeFile: string,
  todo: Appcraft.WidgetTodo
) => TodoState;

export type GetFlowNodes = (
  todos: Record<string, Appcraft.WidgetTodo>,
  each?: (node: TodoNode) => void
) => TodoNode[];

export type GetFlowEdges = (
  todos: Record<string, Appcraft.WidgetTodo>,
  each?: (edge: TodoEdge) => void
) => TodoEdge[];
