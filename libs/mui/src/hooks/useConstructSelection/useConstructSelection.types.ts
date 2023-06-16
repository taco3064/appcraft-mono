import type { ReactNode } from 'react';

export const statuses = [null, 'state', 'props'] as const;
export type Status = (typeof statuses)[number];

export type ConstructSelectionHook = (
  renderFn: (options: {
    status: Status;
    onStatusChange: (status: Status) => void;
  }) => ReactNode
) => [Status, ReactNode];
