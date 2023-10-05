import type { ReactNode } from 'react';
import type { Website } from '@appcraft/types';

import type { BaseOption } from '~appcraft/hooks';
import type { HierarchyData } from '~appcraft/services';

//* Methods
export type GetPageOptionsFn = (
  pages: Website['pages'],
  superior?: string
) => BaseOption[];

//* Component Props
export interface WebsiteLayoutEditorProps {
  action?: ReactNode;
  palettes: HierarchyData<string>[];
  value: Website;
  onBack?: () => void;
  onChange: (value: Website) => void;
}
