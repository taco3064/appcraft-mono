import type { MouseEventHandler } from 'react';
import type { FixedT } from '../../../contexts';

export interface NoWidgetItemProps {
  fixedT?: FixedT;
  onAdd: MouseEventHandler<HTMLButtonElement>;
}
