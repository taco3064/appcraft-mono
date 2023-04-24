import type { PropTypesDef } from '@appcraft/types';

export interface TypeItemProps {
  disableSelection?: boolean;
  options: PropTypesDef;
  onDisplayItemClick: (options: PropTypesDef) => void;
}
