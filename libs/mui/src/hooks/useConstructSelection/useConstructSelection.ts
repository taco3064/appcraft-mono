import { useState } from 'react';

import { useConstructContext } from '../../contexts';
import type * as Types from './useConstructSelection.types';

const useConstructSelection: Types.ConstructSelectionHook = (renderFn) => {
  const { widget, onWidgetChange } = useConstructContext();
  const [status, setStatus] = useState<Types.Status>(null);

  return [
    status,
    !widget
      ? null
      : renderFn({
          status,
          onStatusChange: (newStatus) => {
            const {
              construct: { state, props },
            } = widget;

            setStatus(newStatus);
            // onWidgetChange({ ...widget, status: newStatus });
          },
        }),
  ];
};

export default useConstructSelection;
