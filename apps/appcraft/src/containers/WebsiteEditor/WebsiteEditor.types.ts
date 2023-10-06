import type { ConfigData, Website } from '@appcraft/types';
import type { Breadcrumb, Navigation, NodePickerFn } from '~appcraft/hooks';

//* Methods
export type GetHomePageFn = (
  id: string,
  routes: Website['pages'],
  superior?: string
) => Navigation | null;

//* Component Props
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
