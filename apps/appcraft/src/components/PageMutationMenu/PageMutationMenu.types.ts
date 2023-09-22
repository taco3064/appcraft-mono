import type { Website } from '@appcraft/types';

//* Variables
export type Page = Website['pages'][number];

//* Component Props
export interface PageMutationMenuProps {
  data: Page;
  onChange: (data: Page) => void;
}
