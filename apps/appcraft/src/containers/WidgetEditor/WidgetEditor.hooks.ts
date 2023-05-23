import { useMemo, useState } from 'react';
import { Components, useTheme } from '@mui/material/styles';
import _set from 'lodash.set';
import type { CraftedRendererProps } from '@appcraft/mui';

import type { EditedValuesHook } from './WidgetEditor.types';

export const useEditedValues: EditedValuesHook = (data) => {
  const theme = useTheme();
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

    onWidgetChange: (propPath, value) => {
      const overrides: [string, unknown][] =
        propPath !== 'type'
          ? [[propPath, value]]
          : [
              [propPath, value],
              [
                'content',
                JSON.parse(
                  JSON.stringify(
                    theme.components[`Mui${value}` as keyof Components]
                      .defaultProps
                  )
                ),
              ],
              ['mapping', {}],
            ];

      setValues({
        ...values,
        widgets: values.widgets.map((widget) =>
          widget.id !== editingId
            ? widget
            : overrides.reduce(
                (result, [path, newValue]) => _set(result, path, newValue),
                widget
              )
        ),
      });
    },
  };
};
