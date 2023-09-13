import type * as Appcraft from '@appcraft/types';

//* Variables
type Widget = Appcraft.MainWidget | Appcraft.EntityWidgets;

//* Methods
export type ConvertInjectionWithStates = (options: {
  injection?: Appcraft.LayoutWidget['template'];
  states?: Appcraft.MainWidget['state'];
}) => Pick<Appcraft.MainWidget, 'props' | 'todos'>;

export type SetTodoPriorityFn = (
  allTodos: Exclude<Appcraft.MainWidget['todos'], undefined>,
  priority: number
) => Exclude<Appcraft.MainWidget['todos'], undefined>;

export type GetWidgetOptionsFn = (
  ...args:
    | ['template', string]
    | ['widget', string]
    | ['type', { typeFile: string; typeName: string }]
) => Appcraft.MainWidget | undefined;

export type GetWidgetNodesFn = (
  options: {
    defaultNodes?: Appcraft.MainWidget['nodes'];
    injection?: Appcraft.LayoutWidget['template'];
    value: unknown;
    states?: Appcraft.MainWidget['state']['nodes'];
  },
  getWidgetOptions: GetWidgetOptionsFn
) => Appcraft.MainWidget['nodes'];

export type GetWidgetPropsFn = (options: {
  value: unknown;
  states?: Appcraft.MainWidget['state']['props'];
}) => Appcraft.MainWidget['props'];

export type GetWidgetTodosFn = (options: {
  defaults?: Appcraft.MainWidget['todos'];
  template?: Appcraft.MainWidget['todos'];
  injection?: Appcraft.MainWidget['todos'];
  states?: Appcraft.MainWidget['state']['todos'];
}) => Appcraft.MainWidget['todos'];

export type GetWidgetsByValueFn = (
  widget: Appcraft.MainWidget | undefined,
  injection: Appcraft.LayoutWidget['template'] | undefined,
  value: unknown,
  state: Appcraft.EntityNodeStates,
  getWidgetOptions: GetWidgetOptionsFn
) => Widget | Widget[];
