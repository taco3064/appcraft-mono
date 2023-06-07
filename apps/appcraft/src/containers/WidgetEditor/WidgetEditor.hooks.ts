import { useState } from 'react';
import type { NodeWidget } from '@appcraft/types';

import type { EditedWidgetHook } from './WidgetEditor.types';

export const useEditedWidget: EditedWidgetHook = (data) => {
  const [widget, setWidget] = useState<Partial<NodeWidget>>(() =>
    JSON.parse(JSON.stringify(data?.content || {}))
  );

  return {
    widget,
    onReset: () => setWidget(JSON.parse(JSON.stringify(data?.content || {}))),

    onWidgetChange: (widgetField, value) =>
      setWidget({ ...widget, [widgetField]: value }),
  };
};
