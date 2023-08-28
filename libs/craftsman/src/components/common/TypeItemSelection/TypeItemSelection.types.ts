import type { PropTypesDef } from '@appcraft/types';
import type { SelectHandler } from '../../../hooks';

export interface TypeItemSelectionProps {
  checked: boolean;
  options?: PropTypesDef;
  onSelect: SelectHandler;
}
