import Collapse from '@mui/material/Collapse';

import { NestedElements } from '../NestedElements';
import { TypeEditor } from '../TypeEditor';
import type * as Types from './CraftedWidgetEditor.types';

export default function CraftedWidgetEditor({
  fixedT,
  widget,
  widgetTypeSelection,
  onBackToElements,
  onWidgetAdd,
  onWidgetChange,
  onWidgetSelect,
  ...props
}: Types.CraftedWidgetEditorProps) {
  return (
    <>
      {/* <EditorAppBar
        {...{
          fixedT,
          select,
          widget,
          onBackToElements,
          onWidgetAdd,
          onWidgetChange,
          onWidgetSelect,
        }}
      /> */}

      <Collapse in={Boolean(!widget)}>
        <NestedElements {...{ fixedT, widgets, onWidgetSelect }} />
      </Collapse>

      <Collapse in={Boolean(widget)}>
        {widget && (
          <TypeEditor
            {...(props as Types.EditorPartProps)}
            fixedT={fixedT}
            mixedTypes={widget.mapping}
            values={widget}
            onChange={(fieldName, value) => onWidgetChange(fieldName, value)}
            onMixedTypeMapping={(mapping) => onWidgetChange('mapping', mapping)}
          />
        )}
      </Collapse>
    </>
  );
}
