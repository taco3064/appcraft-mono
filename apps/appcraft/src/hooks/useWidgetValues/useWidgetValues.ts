import { useCallback, useState } from 'react';
import type { RootNodeWidget } from '@appcraft/types';

import type { WidgetValuesHook } from './useWidgetValues.types';

const useWidgetValues: WidgetValuesHook = (data) => {
  const [widget, setWidget] = useState<RootNodeWidget>(
    () => data?.content?.type && JSON.parse(JSON.stringify(data.content || {}))
  );

  return {
    widget,
    onWidgetChange: useCallback((e) => setWidget(!e ? null : e), [setWidget]),

    onReset: () =>
      setWidget(
        !data?.content ? null : JSON.parse(JSON.stringify(data.content || {}))
      ),
  };
};

export default useWidgetValues;
