import type { PropTypesDef } from '@appcraft/types';
import type { PropPaths } from '../../contexts';

export type PropPathRouterHandler = (options: PropTypesDef) => void;
export type GetPropPathUtil = (paths: PropPaths) => string;

export type GetPropPathBySourceUtil = (
  source: object,
  paths: string[]
) => string;

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
