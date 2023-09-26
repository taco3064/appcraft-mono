import type { DragEndEvent } from '@dnd-kit/core';
import type { Website } from '@appcraft/types';

//* Variables
export type Navigation = Website['pages'][number];

export type NavHierarchy = Pick<Navigation, 'id' | 'subTitle'> & {
  index: number;
};

export type Links = Navigation['links'];

//* Custom Hooks
export type NavValuesHook = (
  values: Navigation[] | undefined,
  onChange: (values: Navigation[]) => void
) => [
  {
    hierarchies: NavHierarchy[];
    items: Navigation[];
    paths: (string | number)[];
  },
  {
    //* For Breadcrumbs
    active: (e: number | NavHierarchy) => void;
    back: () => void;
    top: () => void;

    //* For Mutation
    dnd: (e: DragEndEvent) => void;
    mutate: (e: { index?: number; nav?: Navigation }) => void;
    superior: (e: Navigation) => void;
  }
];
