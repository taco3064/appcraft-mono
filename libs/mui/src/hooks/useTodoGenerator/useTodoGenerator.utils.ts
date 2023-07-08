import { MarkerType } from 'reactflow';
import { nanoid } from 'nanoid';
import type * as Appcraft from '@appcraft/types';

import { splitProps } from '../useWidgetGenerator';
import type * as Types from './useTodoGenerator.types';

export const getFlowNodes: Types.GetFlowNodesUtil = (todos, each) =>
  Object.values(todos).map<Types.TodoNode>((todo) => {
    const node = {
      id: todo.id,
      type: 'default',
      draggable: false,
      data: { label: todo.description, metadata: todo },
      position: { x: 0, y: 0 },
    };

    each?.(node);

    return node;
  });

export const getFlowEdges: Types.GetFlowEdgesUtil = (todos, each) =>
  Object.values(todos).reduce<Types.TodoEdge[]>((result, todo) => {
    const { id, category, defaultNextTodo } = todo;

    if (defaultNextTodo) {
      const edge = {
        id: `${id}-${defaultNextTodo}`,
        source: id,
        target: defaultNextTodo,
        markerEnd: { type: MarkerType.ArrowClosed },
        ...(category === 'branch' && { label: 'No' }),
        ...(category === 'iterate' && { label: 'Completed' }),
      };

      each?.(edge);
      result.push(edge);
    }

    if (category === 'iterate' && todo.iterateTodo) {
      const edge = {
        id: `${id}-${todo.iterateTodo}`,
        source: id,
        target: todo.iterateTodo,
        markerEnd: { type: MarkerType.ArrowClosed },
      };

      each?.(edge);
      result.push(edge);
    } else if (category === 'branch') {
      todo.branches?.forEach(({ metTodo }) => {
        if (todos?.[metTodo]) {
          const edge = {
            id: `${id}-${metTodo}`,
            source: id,
            target: metTodo,
            label: 'Yes',
            markerEnd: { type: MarkerType.ArrowClosed },
          };

          each?.(edge);
          result.push(edge);
        }
      });
    }

    return result;
  }, []);

export const getInitialTodo: Types.GetInitialTodoUtil = (
  typeFile,
  category
) => {
  const data: Pick<Appcraft.WidgetTodo, 'description' | 'id'> = {
    id: nanoid(4),
    description: '',
  };

  switch (category) {
    case 'variable': {
      const todo: Appcraft.VariableTodo = {
        ...data,
        category,
        variables: {},
      };

      return {
        todo,
        config: {
          category: 'config',
          typeFile,
          typeName: 'VariableTodo',
          props: splitProps(todo),
        },
      };
    }
    case 'fetch': {
      const todo: Appcraft.FetchTodo = {
        ...data,
        category,
        url: '',
        method: 'GET',
      };

      return {
        todo,
        config: {
          category: 'config',
          typeFile,
          typeName: 'FetchTodo',
          props: splitProps(todo),
        },
      };
    }
    case 'branch': {
      const todo: Appcraft.ConditionBranchTodo = {
        ...data,
        category,
        sources: [],
        branches: [],
      };

      return {
        todo,
        config: {
          category: 'config',
          typeFile,
          typeName: 'ConditionBranchTodo',
          props: splitProps(todo),
        },
      };
    }
    case 'iterate': {
      const todo: Appcraft.IterateTodo = {
        ...data,
        category,
        iterateTodo: '',
        source: {
          mode: 'extract',
          initial: {
            sourceType: 'input',
            key: '',
          },
        },
      };

      return {
        todo,
        config: {
          category: 'config',
          typeFile,
          typeName: 'IterateTodo',
          props: splitProps(todo),
        },
      };
    }
    default:
      return null;
  }
};
