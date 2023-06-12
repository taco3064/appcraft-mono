import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import type { NodeWidget } from '@appcraft/types';

import { CraftedTypeEditor } from '../CraftedTypeEditor';
import { WidgetAppBar } from '../WidgetAppBar';
import { WidgetStructure } from '../WidgetStructure';
import { useFixedT } from '../../contexts';
import type * as Types from './CraftedWidgetEditor.types';

export default function CraftedWidgetEditor({
  defaultValues,
  disableSelection,
  fetchOptions: { parser, nodes },
  fixedT,
  widget,
  renderWidgetTypeSelection,
  onWidgetChange,
  ...props
}: Types.CraftedWidgetEditorProps) {
  const ct = useFixedT(fixedT);
  const [selected, setSelected] = useState<NodeWidget | null>(null);

  return (
    <>
      <WidgetStructure
        fixedT={fixedT}
        open={Boolean(!selected)}
        nodes={nodes}
        widget={widget}
        renderWidgetTypeSelection={renderWidgetTypeSelection}
        onWidgetChange={onWidgetChange}
        onWidgetSelect={setSelected}
        action={
          <AppBar color="default" position="sticky">
            <Toolbar variant="regular">
              <Typography
                variant="subtitle1"
                fontWeight="bolder"
                color="primary"
              >
                {ct('ttl-structure')}
              </Typography>
            </Toolbar>
          </AppBar>
        }
      />

      {widget && (
        <CraftedTypeEditor
          disableSelection={disableSelection}
          fixedT={fixedT}
          open={Boolean(selected)}
          parser={parser}
          values={widget}
          onChange={onWidgetChange}
          action={
            <WidgetAppBar
              description={widget.type.replace(/([A-Z])/g, ' $1')}
              onBackToStructure={() => setSelected(null)}
            />
          }
        />
      )}
    </>
  );
}
