import { useCallback, useState } from 'react';
import type { RootNodeWidget } from '@appcraft/types';

import type { EditedWidgetHook } from './WidgetEditor.types';

export const useEditedWidget: EditedWidgetHook = (data) => {
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
