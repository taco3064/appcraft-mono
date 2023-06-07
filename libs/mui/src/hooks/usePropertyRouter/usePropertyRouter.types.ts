import type { PropTypesDef } from '@appcraft/types';

export type PropPathRouterHandler = (options: PropTypesDef) => void;
export type GetPropPathFn = (source: object, paths: string[]) => string;

export type PropertyRouterHook = (
  onCollectionPathChange: (propPath: string) => void
) => [
  {
    name: string;
    isStructureArray: boolean;
    isLast: boolean;
  }[],
  {
    back: (index?: number) => void;
    to: PropPathRouterHandler;
  }
];
