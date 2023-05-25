import { useMemo } from 'react';
import type { NestedItemsHook } from './NestedElements.types';

export const useNestedItems: NestedItemsHook = ({ superior, widgets = [] }) =>
  useMemo(
    () =>
      widgets.filter(({ superior: $superior }) =>
        !superior ? !$superior : superior === $superior
      ),
    [superior, widgets]
  );
