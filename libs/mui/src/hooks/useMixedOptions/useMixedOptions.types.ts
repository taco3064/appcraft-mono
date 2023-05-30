import type * as Appcraft from '@appcraft/types';

import type { Category } from '../useTypeCategory';
import type { MixedTypeMappingResult } from '../../contexts';

export type MixedOptionsHook = (
  category: Category | null,
  options: Appcraft.PropTypesDef
) => null | {
  horizontal: 'right' | 'center';
  matched: Appcraft.OneOfTypeOptions | undefined;
  propType: Appcraft.OneOfTypeProp;
  selected: MixedTypeMappingResult[0];
  setSelected: MixedTypeMappingResult[1];
};
