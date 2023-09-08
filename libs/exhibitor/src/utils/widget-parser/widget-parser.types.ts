import type * as Appcraft from '@appcraft/types';

//* Variables
type Widget = Appcraft.MainWidget | Appcraft.EntityWidgets;

//* Methods
export type SetTodoPriorityFn = (
  allTodos: Exclude<Appcraft.MainWidget['todos'], undefined>,
  priority: number
) => Exclude<Appcraft.MainWidget['todos'], undefined>;

export type GetWidgetOptionsFn = (
  getBy: 'template' | 'widget',
  id: string
) => Appcraft.MainWidget | undefined;

export type GetNodesByValueFn = (
  options: {
    defaultNodes?: Appcraft.MainWidget['nodes'];
    value: unknown;
    states?: Appcraft.MainWidget['state']['nodes'];
  },
  getWidgetOptions: GetWidgetOptionsFn
) => Appcraft.MainWidget['nodes'];

export type GetPropsByValueFn = (options: {
  value: unknown;
  states?: Appcraft.MainWidget['state']['props'];
}) => Appcraft.MainWidget['props'];

export type GetTodosByTemplateFn = (options: {
  defaultTodos?: Appcraft.MainWidget['todos'];
  template?: Appcraft.MainWidget['todos'];
  states?: Appcraft.MainWidget['state']['todos'];
}) => Appcraft.MainWidget['todos'];

export type GetWidgetsByValueFn = (
  widget: Appcraft.MainWidget | undefined,
  value: unknown,
  state: Appcraft.EntityNodeStates,
  getWidgetOptions: GetWidgetOptionsFn
) => Widget | Widget[];
