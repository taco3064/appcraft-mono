import type { ReactNode } from 'react';
import type { Website } from '@appcraft/types';

import type { HierarchyData } from '~appcraft/services';

export interface WebsiteLayoutEditorProps {
  action?: ReactNode;
  palettes: HierarchyData<string>[];
  value: Website;
  onBack?: () => void;
  onChange: (value: Website) => void;
}
