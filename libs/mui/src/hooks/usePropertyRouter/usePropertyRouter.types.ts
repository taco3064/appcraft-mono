import type { PropTypesDef } from '@appcraft/types';

export interface PropertyOptions {
  values: object;
  onPropPathChange: (propPath: string) => void;
}

export type ToPathHandler = (options: PropTypesDef) => void;

export type PropertyRouterHook = (
  options: PropertyOptions,
  propPath: string
) => [
  {
    name: string;
    isArrayElement: boolean;
    isLast: boolean;
  }[],
  {
    back: (index?: number) => void;
    to: ToPathHandler;
  }
];
