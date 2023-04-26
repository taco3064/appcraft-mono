import type { PropTypesDef } from '@appcraft/types';
import type { ReactNode } from 'react';

export interface TypeItemProps {
  action?: ReactNode;
  disableSelection?: boolean;
  options: PropTypesDef;
  onDisplayItemClick: (options: PropTypesDef) => void;
}

export type GetTypeSeqFn = (type: PropTypesDef['type']) => number;
