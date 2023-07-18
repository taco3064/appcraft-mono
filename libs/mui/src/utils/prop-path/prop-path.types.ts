import type * as Appcraft from '@appcraft/types';

//* Variables
export type PropPaths = (string | number)[];

//* Methods
export type GetPropOrderSeq = (type: Appcraft.PropTypesDef['type']) => number;
export type GetPropPath = (paths: PropPaths) => string;
