import type { ReactNode } from 'react';
import type { WebsiteConfig } from '@appcraft/types';

export interface AppLayoutProps {
  children: ReactNode;
  disableCssBaseline?: boolean;
  override?: WebsiteConfig;
  scale?: number;
}
