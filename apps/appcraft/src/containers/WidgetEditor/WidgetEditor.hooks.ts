import { useState } from 'react';
import { MUI_WIDGETS } from '@appcraft/types';
import type { NodeWidget } from '@appcraft/types';

import type { EditedWidgetHook, WidgetMap } from './WidgetEditor.types';

const widgets = MUI_WIDGETS.widgets.reduce<WidgetMap>(
  (result, { components }) => {
    components.forEach(({ id, typeFile, typeName }) =>
      result.set(id, { typeFile, typeName })
    );

    return result;
  },
  new Map()
);

export const useEditedWidget: EditedWidgetHook = (data) => {
  const [widget, setWidget] = useState<NodeWidget>(
    () => data?.content?.type && JSON.parse(JSON.stringify(data.content || {}))
  );

  return {
    widget,
    onWidgetChange: (e) =>
      setWidget((prev) =>
        !e ? null : e.type === prev?.type ? e : { ...widgets.get(e.type), ...e }
      ),

    onReset: () =>
      setWidget(
        !data?.content ? null : JSON.parse(JSON.stringify(data.content || {}))
      ),
  };
};
