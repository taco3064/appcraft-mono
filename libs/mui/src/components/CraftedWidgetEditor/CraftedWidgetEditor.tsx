import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

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
}: Types.CraftedWidgetEditorProps) {
  const ct = useFixedT(fixedT);

  return (
    <WidgetStructure
      open
      fixedT={fixedT}
      nodes={nodes}
      widget={widget}
      renderWidgetTypeSelection={renderWidgetTypeSelection}
      onWidgetChange={onWidgetChange}
      action={
        <AppBar color="default" position="sticky">
          <Toolbar variant="regular">
            <Typography variant="subtitle1" fontWeight="bolder" color="primary">
              {ct('ttl-structure')}
            </Typography>
          </Toolbar>
        </AppBar>
      }
    >
      {({ selected, onBackToStructure, onSelectedChange }) => (
        <CraftedTypeEditor
          disableSelection={disableSelection}
          fixedT={fixedT}
          open={Boolean(selected)}
          parser={parser}
          values={selected}
          onChange={onSelectedChange}
          action={
            <WidgetAppBar
              description={selected.type.replace(/([A-Z])/g, ' $1')}
              onBackToStructure={onBackToStructure}
            />
          }
        />
      )}
    </WidgetStructure>
  );
}
