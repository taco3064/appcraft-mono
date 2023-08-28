import type * as Appcraft from '@appcraft/types';
import type { ReactNode } from 'react';

import type { MixedProp } from '../../../contexts';

export interface TypeItemMixedProps extends Appcraft.BaseTypeItem<MixedProp> {
  renderMatchedField: (
    matched: Appcraft.PropTypesDef,
    typeText: string,
    action: ReactNode
  ) => ReactNode;
}
