import type { ReactNode } from 'react';
import type { PropTypesDef } from './prop-types-def.types';

export type CollectionType = 'array' | 'object';

export interface BaseField<O extends PropTypesDef> {
  action?: ReactNode;
  description?: ReactNode;
  disabled?: boolean;
  label: string;
  options: O;
  propPath: string;
  selection?: ReactNode;
}
