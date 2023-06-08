import AppBar from '@mui/material/AppBar';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

import { CraftedTypeEditor } from '../CraftedTypeEditor';
import { WidgetAppBar } from '../common';
import { useFixedT } from '../../contexts';
import type * as Types from './CraftedWidgetEditor.types';

export default function CraftedWidgetEditor({
  defaultValues,
  fixedT,
  widget,
  widgetTypeSelection,
  onWidgetChange,
  ...props
}: Types.CraftedWidgetEditorProps) {
  const ct = useFixedT(fixedT);
  const [actived, setActived] = useState<'structure' | 'editor'>('editor');

  return (
    <>
      <Collapse in={actived === 'structure'}>
        <AppBar color="default" position="sticky">
          <Toolbar variant="regular">
            <Typography variant="subtitle1" fontWeight="bolder" color="primary">
              {ct('ttl-structure')}
            </Typography>
          </Toolbar>
        </AppBar>

        <Divider />
      </Collapse>

      <Collapse in={actived === 'editor'}>
        <CraftedTypeEditor
          {...(props as Types.TypeParseProps)}
          fixedT={fixedT}
          mixedTypes={widget.mapping}
          values={widget}
          onChange={(fieldName, value) => onWidgetChange(fieldName, value)}
          onMixedTypeMapping={(mapping) => onWidgetChange('mapping', mapping)}
          action={
            <>
              <WidgetAppBar
                onBackToStructure={() => setActived('structure')}
                {...{
                  fixedT,
                  widget,
                  widgetTypeSelection,
                  onWidgetChange,
                }}
              />

              <Divider />
            </>
          }
        />
      </Collapse>
    </>
  );
}
