import type { ReactNode } from 'react';

export type PartialNodes<K extends string> = Partial<
  Record<K, ReactNode>
> | null;

export type NodePickerFn<K extends string> = (
  nodes: Record<K, ReactNode>
) => Partial<Record<K, ReactNode>>;
