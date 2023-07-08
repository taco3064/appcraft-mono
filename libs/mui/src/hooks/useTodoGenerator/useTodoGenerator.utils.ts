import { MarkerType } from 'reactflow';
import { nanoid } from 'nanoid';
import type * as Appcraft from '@appcraft/types';

import { splitProps } from '../useWidgetGenerator';
import type * as Types from './useTodoGenerator.types';

export const getFlowNodes: Types.GetFlowNodesUtil = (todos, theme, each) =>
  Object.values(todos).map<Types.TodoNode>((todo) => {
    const subInfo = todo.category.replace(/^./, (match) => match.toUpperCase());

    const color =
      todo.category === 'variable'
        ? 'info'
        : todo.category === 'branch'
        ? 'warning'
        : todo.category === 'fetch'
        ? 'success'
        : 'error';

    const node: Types.TodoNode = {
      id: todo.id,
      type: 'default',
      draggable: false,
      position: { x: 0, y: 0 },
      data: {
        label: `${todo.description} <${subInfo}>`,
        metadata: todo,
      },
      style: {
        background: theme.palette[color].main,
        color: theme.palette[color].contrastText,
      },
    };

    each?.(node);

    return node;
  });

export const getFlowEdges: Types.GetFlowEdgesUtil = (todos, theme, each) =>
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

export const getTodoState: Types.GetTodoStateUtil = (typeFile, todo) => {
  switch (todo.category) {
    case 'variable':
      return {
        todo,
        config: {
          category: 'config',
          typeFile,
          typeName: 'VariableTodo',
          props: splitProps(todo),
        },
      };

    case 'fetch':
      return {
        todo,
        config: {
          category: 'config',
          typeFile,
          typeName: 'FetchTodo',
          props: splitProps(todo),
        },
      };

    case 'branch':
      return {
        todo,
        config: {
          category: 'config',
          typeFile,
          typeName: 'ConditionBranchTodo',
          props: splitProps(todo),
        },
      };

    case 'iterate':
      return {
        todo,
        config: {
          category: 'config',
          typeFile,
          typeName: 'IterateTodo',
          props: splitProps(todo),
        },
      };

    default:
      return null;
  }
};

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

      return getTodoState(typeFile, todo);
    }
    case 'fetch': {
      const todo: Appcraft.FetchTodo = {
        ...data,
        category,
        url: '',
        method: 'GET',
      };

      return getTodoState(typeFile, todo);
    }
    case 'branch': {
      const todo: Appcraft.ConditionBranchTodo = {
        ...data,
        category,
        sources: [],
        branches: [],
      };

      return getTodoState(typeFile, todo);
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

      return getTodoState(typeFile, todo);
    }
    default:
      return null;
  }
};
