import type { PropTypesDef } from '@appcraft/types';

export type PropPathRouterHandler = (options: PropTypesDef) => void;

export type PropertyRouterHook = (
  onCollectionPathChange: (propPath: string) => void
) => [
  {
    name: string;
    isStructureArray: boolean;
  }[],
  {
    back: (index?: number) => void;
    to: PropPathRouterHandler;
  }
];
