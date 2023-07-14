import type * as Appcraft from '@appcraft/types';
import type { ReactNode } from 'react';

export interface TypeItemMixedProps
  extends Appcraft.BaseField<Appcraft.OneOfTypeProp> {
  renderMatchedField: (
    matched: Appcraft.PropTypesDef,
    typeText: string,
    action: ReactNode
  ) => ReactNode;
}
