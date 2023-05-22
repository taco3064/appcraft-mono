import type { CraftedEditorProps, NodePickerFn } from '@appcraft/mui';

import type { Breadcrumb } from '~appcraft/hooks';
import type { ConfigData } from '~appcraft/services';

export interface ConfigDetailProps<C extends object>
  extends Pick<CraftedEditorProps, 'typeFile' | 'typeName'> {
  data: ConfigData<Partial<C>, string>;
  onActionNodePick?: NodePickerFn<'reset' | 'save'>;
  onSave?: () => void;

  superiors: {
    names: Record<string, string>;
    breadcrumbs: Breadcrumb[];
  };
}
