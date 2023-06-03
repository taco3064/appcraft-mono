import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';

import { EditorAppBar } from '../EditorAppBar';
import { NestedElements } from '../NestedElements';
import { TypeEditor } from '../TypeEditor';
import { useFixedT } from '../../contexts';
import type * as Types from './CraftedWidgetEditor.types';

export default function CraftedWidgetEditor({
  fixedT,
  select,
  widget,
  widgets,
  onBackToElements,
  onWidgetAdd,
  onWidgetChange,
  onWidgetSelect,
  ...props
}: Types.CraftedWidgetEditorProps) {
  const ct = useFixedT(fixedT);

  return (
    <>
      <EditorAppBar
        {...{
          fixedT,
          select,
          widget,
          onBackToElements,
          onWidgetAdd,
          onWidgetChange,
          onWidgetSelect,
        }}
      />

      <Collapse in={Boolean(!widget)}>
        <NestedElements {...{ fixedT, widgets, onWidgetSelect }} />
      </Collapse>

      <Collapse in={Boolean(widget)}>
        {!widget?.type ? (
          <Typography
            variant="h6"
            color="text.secondary"
            align="center"
            sx={{
              justifyContent: 'center',
              marginTop: (theme) => theme.spacing(2),
            }}
          >
            {ct('msg-select-widget-type-first')}
          </Typography>
        ) : (
          <TypeEditor
            {...(props as Types.EditorPartProps)}
            fixedT={fixedT}
            mixedTypes={widget.mapping}
            values={widget.content}
            onChange={(content) => onWidgetChange('content', content)}
            onMixedTypeMapping={(mapping) => onWidgetChange('mapping', mapping)}
          />
        )}
      </Collapse>
    </>
  );
}
