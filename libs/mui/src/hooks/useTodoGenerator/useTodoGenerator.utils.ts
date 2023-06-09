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
    const acc: Types.TodoEdge[] = [];
    const { id, category, defaultNextTodo } = todo;

    if (defaultNextTodo) {
      acc.push({
        id: `${id}-${defaultNextTodo}`,
        source: id,
        target: defaultNextTodo,
        markerEnd: { type: MarkerType.ArrowClosed },
        ...(category === 'branch' && { label: 'No' }),
        ...(category === 'iterate' && { label: 'Completed' }),
      });
    }

    if (category === 'iterate' && todo.iterateTodo) {
      acc.push({
        id: `${id}-${todo.iterateTodo}`,
        source: id,
        target: todo.iterateTodo,
        markerEnd: { type: MarkerType.ArrowClosed },
      });
    }

    if (category === 'branch' && todo.metTodo) {
      acc.push({
        id: `${id}-${todo.metTodo}`,
        source: id,
        target: todo.metTodo,
        label: 'Yes',
        markerEnd: { type: MarkerType.ArrowClosed },
      });
    }

    each && acc.forEach(each);
    result.push(...acc);

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
    case 'variable':
      return getTodoState(typeFile, {
        ...data,
        category,
        variables: {},
      });

    case 'fetch':
      return getTodoState(typeFile, {
        ...data,
        category,
        url: '',
        method: 'GET',
      });

    case 'branch':
      return getTodoState(typeFile, {
        ...data,
        category,
        sources: [],
        template: '',
        metTodo: '',
      });

    case 'iterate':
      return getTodoState(typeFile, {
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
      });

    default:
      return null;
  }
};
