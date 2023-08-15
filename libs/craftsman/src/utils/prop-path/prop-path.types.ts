import { ExhibitorUtil } from '@appcraft/exhibitor';
import type * as Appcraft from '@appcraft/types';

//* Variables
export type PropPaths = Parameters<typeof ExhibitorUtil.getPropPath>[0];

//* Methods
export type GetPropOrderSeq = (type: Appcraft.PropTypesDef['type']) => number;
