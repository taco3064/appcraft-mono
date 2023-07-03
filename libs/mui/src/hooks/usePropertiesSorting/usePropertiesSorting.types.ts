import type * as Appcraft from '@appcraft/types';
import type { StructureType } from '../../services';

export type PropertiesSortingHook = (
  basicType?: StructureType
) => Appcraft.PropTypesDef[];
