import Collapse from '@mui/material/Collapse';
import { useState } from 'react';

import { TypeEditor } from '../TypeEditor';
import { WidgetAppBar } from '../common';
import type * as Types from './CraftedWidgetEditor.types';

export default function CraftedWidgetEditor({
  defaultValues,
  fixedT,
  widget,
  widgetTypeSelection,
  onWidgetChange,
  ...props
}: Types.CraftedWidgetEditorProps) {
  const [actived, setActived] = useState<'structure' | 'editor'>('editor');

  return (
    <>
      <Collapse in={actived === 'structure'}>Widget Structure</Collapse>

      <Collapse in={actived === 'editor'}>
        <TypeEditor
          {...(props as Types.EditorPartProps)}
          fixedT={fixedT}
          mixedTypes={widget.mapping}
          values={widget}
          onChange={(fieldName, value) => onWidgetChange(fieldName, value)}
          onMixedTypeMapping={(mapping) => onWidgetChange('mapping', mapping)}
          action={
            <WidgetAppBar
              onBackToElements={() => setActived('structure')}
              {...{
                fixedT,
                widget,
                widgetTypeSelection,
                onWidgetChange,
              }}
            />
          }
        />
      </Collapse>
    </>
  );
}
