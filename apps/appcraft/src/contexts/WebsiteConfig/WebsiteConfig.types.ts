import type { ReactNode } from 'react';
import type { WebsiteConfig } from '@appcraft/types';

//* Provider Component Props
export interface WebsiteConfigProviderProps {
  children: ReactNode;
  config: WebsiteConfig;
}
