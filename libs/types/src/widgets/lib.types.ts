import type { ReactNode } from 'react';
import type { PropTypesDef } from './prop-types-def.types';

export type CollectionType = 'array' | 'object';

export interface BaseTypeItem<O extends PropTypesDef> {
  action?: ReactNode;
  description?: ReactNode;
  disabled?: boolean;
  label: string;
  options: O;
  propPath: string;
  selection?: ReactNode;
}

//* Lazy Renderer Fn
export type LazyRenderer<D, R = Record<string, never>> = (
  options: R & {
    fetchData?: D;
  }
) => JSX.Element | null;
