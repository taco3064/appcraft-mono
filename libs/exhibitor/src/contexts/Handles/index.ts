import type * as Types from './Handles.types';

export * from './Handles';
export { default as HandlesProvider } from './Handles';

export type HandleFns = Omit<Types.HandlesProviderProps, 'children'>;

export type {
  FetchWrapperHandler,
  MutableHandles,
  WidgetElement,
} from './Handles.types';
