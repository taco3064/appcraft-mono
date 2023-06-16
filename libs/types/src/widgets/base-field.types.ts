import type { ReactNode } from 'react';
import type { PropTypesDef } from './prop-types-def.types';

export type CollectionType = 'array' | 'object';
export type WidgetField = 'nodes' | 'props' | 'events';

export interface BaseField<O extends PropTypesDef> {
  disabled?: boolean;
  label: string;
  options: O;
  propPath: string;
  action?: ReactNode;
  selection?: ReactNode;
}
