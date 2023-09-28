import type { ConfigData, Website } from '@appcraft/types';
import type { Breadcrumb, NodePickerFn } from '~appcraft/hooks';

export interface WebsiteEditorProps {
  data: ConfigData<Website, string>;

  onActionBasePick?: NodePickerFn<'switch' | 'expand' | 'reset' | 'save'>;
  onActionAddPick?: NodePickerFn<'add'>;
  onSave?: () => void;

  superiors?: {
    names: Record<string, string>;
    breadcrumbs: Breadcrumb[];
  };
}
