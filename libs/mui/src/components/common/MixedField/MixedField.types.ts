import type * as Appcraft from '@appcraft/types';
import type { ReactNode } from 'react';

export interface MixedFieldProps
  extends Appcraft.BaseField<Appcraft.OneOfTypeProp> {
  renderMatchedField: (
    matched: Appcraft.PropTypesDef,
    action: ReactNode
  ) => ReactNode;
}
