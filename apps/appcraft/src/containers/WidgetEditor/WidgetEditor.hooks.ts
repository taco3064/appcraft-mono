import { useState } from 'react';
import type { NodeWidget } from '@appcraft/types';

import type { EditedWidgetHook } from './WidgetEditor.types';

export const useEditedWidget: EditedWidgetHook = (data) => {
  const [widget, setWidget] = useState<NodeWidget>(
    () => data?.content?.type && JSON.parse(JSON.stringify(data.content || {}))
  );

  return {
    widget,

    onReset: () =>
      setWidget(
        !data?.content ? null : JSON.parse(JSON.stringify(data.content || {}))
      ),

    onWidgetChange: (widgetField, value) =>
      setWidget({ ...widget, [widgetField]: value }),
  };
};
