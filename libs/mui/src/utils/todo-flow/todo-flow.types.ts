import type * as Appcraft from '@appcraft/types';
import type { Edge, Node } from 'reactflow';

//* Variables
export type EditingTodo = {
  todo: Omit<Appcraft.WidgetTodo, 'mixedTypes'>;
  config: Appcraft.ConfigOptions;
} | null;

export type TodoEdge = Edge<never>;
export type TodoNode = Node<Appcraft.WidgetTodo>;

//* Methods
export type GetInitialTodo = (
  typeFile: string,
  category: Appcraft.WidgetTodo['category']
) => EditingTodo;

export type GetEditingTodo = (
  typeFile: string,
  todo: Appcraft.WidgetTodo
) => EditingTodo;

export type GetFlowNodes = (
  todos: Record<string, Appcraft.WidgetTodo>,
  each?: (node: TodoNode) => void
) => TodoNode[];

export type GetFlowEdges = (
  todos: Record<string, Appcraft.WidgetTodo>,
  each?: (edge: TodoEdge) => void
) => TodoEdge[];
