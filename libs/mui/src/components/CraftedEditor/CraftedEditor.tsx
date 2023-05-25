import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';

import { EditorAppBar } from '../EditorAppBar';
import { NestedElements } from '../NestedElements';
import { TypeEditor } from '../TypeEditor';
import { useFixedT } from '../../contexts';
import type * as Types from './CraftedEditor.types';

export default function CraftedEditor({
  fixedT,
  select,
  widget,
  widgets,
  onBackToElements,
  onElementAdd,
  onChange,
  onWidgetSelect,
  ...props
}: Types.CraftedEditorProps) {
  const ct = useFixedT(fixedT);

  return (
    <>
      <EditorAppBar
        {...{
          fixedT,
          select,
          widget,
          onBackToElements,
          onElementAdd,
          onChange,
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
            onChange={(content) => onChange('content', content)}
            onMixedTypeMapping={(mapping) => onChange('mapping', mapping)}
          />
        )}
      </Collapse>
    </>
  );
}
