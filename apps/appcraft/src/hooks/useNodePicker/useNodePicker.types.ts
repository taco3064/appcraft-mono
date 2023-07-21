import type { ReactElement } from 'react';

export type PartialNodes<K extends string> = Partial<
  Record<K, ReactElement>
> | null;

export type NodePickerFn<K extends string> = (
  nodes: Record<K, ReactElement>
) => Partial<Record<K, ReactElement>>;
