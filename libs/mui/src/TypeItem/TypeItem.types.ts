import type { PropTypesDef } from '@appcraft/types';

export interface TypeItemProps {
  disableSelection?: boolean;
  options: PropTypesDef;
  onDisplayItemClick: (options: PropTypesDef) => void;
}

export type GetTypeSeqFn = (type: PropTypesDef['type']) => number;
