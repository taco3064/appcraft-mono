import _get from 'lodash/get';
import _toPath from 'lodash/toPath';
import { ExhibitorUtil } from '@appcraft/exhibitor';
import { nanoid } from 'nanoid';
import type * as Appcraft from '@appcraft/types';

import { DEFAULT_SIZE } from '../../styles';
import { splitProps } from '../props';
import type * as Types from './todos.types';

export const getTodoCollectionPath: Types.GetTodoCollectionPath = ({
  widget,
  states,
  todoPath,
} = {}) => {
  const todoStates = Object.entries(
    _get(widget, ['state', 'todos']) || _get(states, ['todos']) || {}
  ) as [string, Appcraft.TodosState][];

  const [target] =
    todoStates.find(
      ([path, { alias }]) =>
        alias === todoPath || path.replace(/^todos\./, '') === todoPath
    ) || [];

  return target?.replace(/^todos\./, '');
};

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

//* @WidgetTodo
export const getEditingTodo: Types.GetEditingTodo = (
  typeFile,
  { mixedTypes, ...todo }
) => {
  const mixed = JSON.parse(JSON.stringify(mixedTypes || {}));

  switch (todo.category) {
    case 'variable':
      return {
        todo,
        config: {
          category: 'config',
          mixedTypes: mixed,
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
          mixedTypes: mixed,
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
          mixedTypes: mixed,
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
          mixedTypes: mixed,
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
          mixedTypes: mixed,
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
          mixedTypes: mixed,
          typeFile,
          typeName: 'SetStateTodo',
          props: splitProps(todo),
        },
      };

    case 'props':
      return {
        todo,
        config: {
          category: 'config',
          mixedTypes: mixed,
          typeFile,
          typeName: 'SetPropsTodo',
          props: splitProps(todo),
        },
      };

    case 'search':
      return {
        todo,
        config: {
          category: 'config',
          mixedTypes: mixed,
          typeFile,
          typeName: 'SearchParamsTodo',
          props: splitProps(todo),
        },
      };

    default:
      return null;
  }
};

//* @WidgetTodo
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
        source: { source: 'output', path: '' },
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

    case 'props':
      return getEditingTodo(typeFile, {
        ...data,
        category,
        props: [],
      });

    case 'search':
      return getEditingTodo(typeFile, {
        ...data,
        category,
        paramKeys: [],
      });

    default:
      return null;
  }
};

export const getTodosInfo: Types.GetTodosInfo = ({
  layout,
  states,
  widget,
  widgetPath,
  todoPath = nanoid(6),
} = {}) => {
  const stateKey = widgetPath?.substring(widgetPath.lastIndexOf('.nodes.') + 7);

  const todoStates = _get(widget, ['state', 'todos']) as Record<
    string,
    Appcraft.TodosState
  >;

  const eventName =
    Object.entries(todoStates || {})
      .find(
        ([path, { alias }]) =>
          alias === todoPath || path === `todos.${todoPath}`
      )?.[0]
      ?.replace(/^todos\./, '') || todoPath;

  const injection = _get(layout, [
    'template',
    ..._toPath(widgetPath),
    'todos',
    todoPath,
  ]);

  const [, state] =
    Object.entries(_get(states, ['nodes']) || {}).find(
      ([path, { alias }]: [string, Appcraft.EntityNodeStates]) =>
        alias === stateKey || path === widgetPath
    ) || [];

  return {
    eventName,
    todos:
      _get(
        ExhibitorUtil.getWidgetTodos({
          injection: { [eventName]: injection },
          template: _get(state, ['template', 'todos']),
          states: todoStates,
        }),
        [eventName]
      ) || {},
  };
};
