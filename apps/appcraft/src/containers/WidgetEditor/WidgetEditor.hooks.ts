import { useMemo, useState } from 'react';
import _set from 'lodash.set';
import type { CraftedRendererProps } from '@appcraft/mui';

import type { EditedValuesHook } from './WidgetEditor.types';

export const useEditedValues: EditedValuesHook = (data) => {
  const [editingId, setEditingId] = useState<string | null>(null);

  const [values, setValues] = useState<CraftedRendererProps['options']>(() =>
    JSON.parse(JSON.stringify(data?.content || {}))
  );

  return {
    values,

    widget: useMemo(
      () => values.widgets?.find(({ id }) => id === editingId),
      [editingId, values]
    ),

    onEditingChange: (id) => setEditingId(id || null),
    onReset: () => setValues(JSON.parse(JSON.stringify(data?.content || {}))),

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
