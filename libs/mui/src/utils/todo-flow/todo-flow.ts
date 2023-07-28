import { nanoid } from 'nanoid';
import type * as Appcraft from '@appcraft/types';

import { DEFAULT_SIZE } from '../../styles';
import { splitProps } from '../props-parser';
import type * as Types from './todo-flow.types';

export const getFlowNodes: Types.GetFlowNodes = (todos, each) =>
  Object.values(todos).map<Types.TodoNode>((todo) => {
    const node: Types.TodoNode = {
      id: todo.id,
      type: todo.category,
      draggable: false,
      position: { x: 0, y: 0 },
      data: todo,
      ...DEFAULT_SIZE.NODE,
    };

    each?.(node);

    return node;
  });

export const getFlowEdges: Types.GetFlowEdges = (todos, each) =>
  Object.values(todos).reduce<Types.TodoEdge[]>((result, todo) => {
    const acc: Types.TodoEdge[] = [];
    const { id, category, defaultNextTodo } = todo;

    if (defaultNextTodo) {
      acc.push({
        id: `${id}-${defaultNextTodo}`,
        source: id,
        sourceHandle: 'defaultNextTodo',
        target: defaultNextTodo,
        ...(category === 'branch' && { label: 'No' }),
        ...(category === 'iterate' && { label: 'Completed' }),
      });
    }

    if (category === 'iterate' && todo.iterateTodo) {
      acc.push({
        id: `${id}-${todo.iterateTodo}`,
        source: id,
        sourceHandle: 'iterateTodo',
        target: todo.iterateTodo,
        label: 'Iterate',
      });
    }

    if (category === 'branch' && todo.metTodo) {
      acc.push({
        id: `${id}-${todo.metTodo}`,
        source: id,
        sourceHandle: 'metTodo',
        target: todo.metTodo,
        label: 'Yes',
      });
    }

    each && acc.forEach(each);
    result.push(...acc);

    return result;
  }, []);

export const getEditingTodo: Types.GetEditingTodo = (
  typeFile,
  { mixedTypes, ...todo }
) => {
  switch (todo.category) {
    case 'variable':
      return {
        todo,
        config: {
          category: 'config',
          mixedTypes,
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
          mixedTypes,
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
          mixedTypes,
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
          mixedTypes,
          typeFile,
          typeName: 'IterateTodo',
          props: splitProps(todo),
        },
      };

    case 'wrap':
      return {
        todo,
        config: {
          category: 'config',
          mixedTypes,
          typeFile,
          typeName: 'WrapTodo',
          props: splitProps(todo),
        },
      };

    case 'state':
      return {
        todo,
        config: {
          category: 'config',
          mixedTypes,
          typeFile,
          typeName: 'SetStateTodo',
          props: splitProps(todo),
        },
      };

    default:
      return null;
  }
};

export const getInitialTodo: Types.GetInitialTodo = (typeFile, category) => {
  const id = nanoid(4);

  const data: Pick<Appcraft.WidgetTodo, 'description' | 'id' | 'alias'> = {
    id,
    alias: id,
    description: '',
  };

  switch (category) {
    case 'variable':
      return getEditingTodo(typeFile, {
        ...data,
        category,
        variables: {},
      });

    case 'fetch':
      return getEditingTodo(typeFile, {
        ...data,
        category,
        url: '',
        method: 'GET',
      });

    case 'branch':
      return getEditingTodo(typeFile, {
        ...data,
        category,
        sources: [],
        template: '',
        metTodo: '',
      });

    case 'iterate':
      return getEditingTodo(typeFile, {
        ...data,
        category,
        iterateTodo: '',
        source: {
          mode: 'extract',
          initial: { source: 'output', path: '' },
        },
      });

    case 'wrap':
      return getEditingTodo(typeFile, {
        ...data,
        category,
        todosId: '',
      });

    case 'state':
      return getEditingTodo(typeFile, {
        ...data,
        category,
        states: [],
      });

    default:
      return null;
  }
};
