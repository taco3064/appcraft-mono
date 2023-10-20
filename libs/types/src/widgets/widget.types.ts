import type * as State from './state.types';
import type { Breakpoints } from '../websites';
import type { TypesParseOptions } from './prop-types-def.types';

//* Variables
enum ConfigCategory {
  config,
  node,
  plainText,
}

export type ChildNodes = { [propPath: string]: State.NodeType };

export type NodeAndEventProps = {
  //* Widget key is `${typeFile}#${typeName}`
  nodes: { [widgetKey: string]: ChildNodes };
  events: { [widgetKey: string]: string[] };
};

//* Options
type BaseConfig<C extends keyof typeof ConfigCategory, P> = {
  category: C;
  description?: string;
} & P;

export type ConfigOptions = BaseConfig<
  'config',
  Omit<TypesParseOptions, 'collectionPath'> & {
    props?: { [propPath: string]: unknown };
  }
>;

export type PlainTextWidget = BaseConfig<
  'plainText',
  { id: string; content: string }
>;

export type NodeWidget = BaseConfig<
  'node',
  Omit<ConfigOptions, 'category'> & {
    id: string;
    type: string;
    nodes?: { [propPath: string]: EntityWidgets | EntityWidgets[] };
    todos?: State.Template['todos'];
  }
>;

export type EntityWidgets = PlainTextWidget | NodeWidget;

export interface MainWidget extends NodeWidget {
  template?: { index?: number };
  state: {
    //* State key is complete path to prop
    nodes?: { [stateKey: string]: State.EntityNodeStates };
    props?: { [stateKey: string]: State.PropsState };
    todos?: { [stateKey: string]: State.TodosState };
  };
}

export type LayoutWidget = {
  id: string;
  layout: Breakpoints<{
    cols: number;
    rows: number;
    overflow: 'fit' | 'scroll';
    hidden: false | 'display' | 'visibility';
    order: number;
  }>;
  links?: {
    [todoPath: string]: {
      alias?: string;
      widgetPaths: (string | number)[];
      stateKey: string;
      todoName: string;
    };
  };
  template: State.Template & {
    props?: { [stateKey: string]: unknown };
    nodes?: { [stateKey: string]: LayoutWidget['template'] };
  };
};
