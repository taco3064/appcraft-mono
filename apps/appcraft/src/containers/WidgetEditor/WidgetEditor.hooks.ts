import { useMemo, useState } from 'react';
import _set from 'lodash.set';

import type { ValuesHook, WidgetConfig } from './WidgetEditor.types';

export const useValues: ValuesHook = (data) => {
  const [editingId, setEditingId] = useState<string | null>(null);

  const [values, setValues] = useState<WidgetConfig>(() =>
    JSON.parse(JSON.stringify(data?.content || {}))
  );

  return {
    values,

    widget: useMemo(
      () => values.widgets?.find(({ id }) => id === editingId),
      [editingId, values]
    ),

    onEditingChange: (id) => setEditingId(id || null),

    onWidgetAdd: (id) =>
      setValues({
        ...values,
        widgets: [
          ...(values.widgets || []),
          { id, type: '', description: '', content: {}, mapping: {} },
        ],
      }),

    onWidgetChange: (propPath, value) =>
      setValues({
        ...values,
        widgets: values.widgets.map((widget) =>
          widget.id !== editingId ? widget : _set(widget, propPath, value)
        ),
      }),
  };
};
