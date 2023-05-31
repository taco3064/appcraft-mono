import type * as Appcraft from '@appcraft/types';

export interface TypeItemNodeProps
  extends Appcraft.BaseField<Appcraft.ElementProp | Appcraft.NodeProp> {
  onSubnodeView: () => void;
}
