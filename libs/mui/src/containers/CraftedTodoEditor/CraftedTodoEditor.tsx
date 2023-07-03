import Collapse from '@mui/material/Collapse';

import * as Hooks from '../../hooks';
import { WidgetAppBar } from '../../components';
import type { CraftedTodoEditorProps } from './CraftedTodoEditor.types';

export default function CraftedTodoEditor({
  fixedT,
  open = true,
  todoPath,
  values,
  onBack,
  onChange,
}: CraftedTodoEditorProps) {
  const ct = Hooks.useFixedT(fixedT);

  return (
    <Collapse in={open}>
      {onBack && (
        <WidgetAppBar
          type="events"
          ct={ct}
          description={todoPath}
          onBackToStructure={onBack}
        />
      )}
    </Collapse>
  );
}
