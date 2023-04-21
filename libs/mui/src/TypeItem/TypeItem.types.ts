import type { PropTypesDef } from '@appcraft/types';

export interface TypeItemProps {
  options: PropTypesDef;
  onDisplayItemClick: (options: PropTypesDef) => void;
}
