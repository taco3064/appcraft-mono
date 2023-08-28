import type * as Appcraft from '@appcraft/types';

import type { DisplayProp } from '../../../contexts';
import type { PropPathRouterHandler } from '../../../hooks';

export interface TypeItemDisplayProps
  extends Omit<Appcraft.BaseTypeItem<DisplayProp>, 'collectionType'> {
  onClick: PropPathRouterHandler;
}
