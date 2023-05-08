import { useMemo } from 'react';
import type { WidgetItemsHook } from './WidgetElements.types';

export const useWidgetItems: WidgetItemsHook = ({ superior, widgets }) =>
  useMemo(
    () =>
      widgets.filter(({ superior: $superior }) =>
        !superior ? !$superior : superior === $superior
      ),
    [superior, widgets]
  );
