import type { ConfigData, Website } from '@appcraft/types';

//* Methods
export type WebsiteChangeHandler = (website: Website) => void;

//* Custom Hooks
export type WebsiteValuesHook = (options: {
  data: ConfigData<Website, string>;
  onSave?: () => void;
}) => [
  Website | undefined,
  {
    change: WebsiteChangeHandler;
    reset: () => void;
    save: () => void;
  }
];
