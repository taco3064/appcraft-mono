import type { ReactNode } from 'react';
import type { WebsiteConfig } from '@appcraft/types';

export interface ExplorerLayoutProps {
  children: ReactNode;
  disableCssBaseline?: boolean;
  override?: WebsiteConfig;
  scale?: number;
}
