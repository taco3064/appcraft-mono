import type { ReactNode } from 'react';
import type { PropTypesDef } from './prop-types-def.types';

export interface BaseField<O extends PropTypesDef> {
  options: O;
  action?: ReactNode;
  selection?: ReactNode;
}
