import type { PropTypesDef } from '@appcraft/types';

export type Category = 'Display' | 'Mixed' | 'Node' | 'Pure';

export type TypeItemHook = (options: PropTypesDef) => {
  category: Category | null;
  label: string;
  propPath: string;
};
