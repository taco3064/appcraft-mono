import type { Breadcrumb, NodePickerFn } from '~appcraft/hooks';
import type { ConfigData } from '~appcraft/services';

export interface ConfigDetailProps<C extends object> {
  data: ConfigData<Partial<C>, string>;
  typeFile: string;
  typeName: string;
  onActionNodePick?: NodePickerFn<'reset' | 'save'>;
  onSave?: () => void;

  superiors: {
    names: Record<string, string>;
    breadcrumbs: Breadcrumb[];
  };
}
