import type * as Appcraft from '@appcraft/types';
import type { PropPathRouterHandler } from '../../../hooks';

export interface TypeItemDisplayProps
  extends Appcraft.BaseField<
    | Appcraft.ArrayOfProp
    | Appcraft.ExactProp
    | Appcraft.FuncProp
    | Appcraft.ObjectProp
    | Appcraft.ObjectOfProp
  > {
  onClick: PropPathRouterHandler;
}
