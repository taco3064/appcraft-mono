import type { PropTypesDef } from '@appcraft/types';
import type { InputStyles } from '../TypeFields';

export interface TypeItemProps {
  InputStyles?: InputStyles;
  options: PropTypesDef;
  onDisplayItemClick: (options: PropTypesDef) => void;
}
