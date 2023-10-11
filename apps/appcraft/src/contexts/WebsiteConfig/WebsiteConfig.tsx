import { createContext, useContext } from 'react';
import type { WebsiteConfig } from '@appcraft/types';

import type * as Types from './WebsiteConfig.types';

//* Custom Hooks
const WebsiteConfigContext = createContext<WebsiteConfig | undefined>(
  undefined
);

export const useWebsiteConfig = () =>
  useContext(WebsiteConfigContext) as WebsiteConfig;

//* Provider Component
export default function WebsiteConfigProvider({
  children,
  config,
}: Types.WebsiteConfigProviderProps) {
  return (
    <WebsiteConfigContext.Provider value={config}>
      {children}
    </WebsiteConfigContext.Provider>
  );
}
