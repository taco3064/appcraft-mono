import * as Hooks from '../../hooks';
import { FullHeightCollapse } from '../../styles';
import { WidgetAppBar } from '../../components';
import type { CraftedTodoEditorProps } from './CraftedTodoEditor.types';

export default function CraftedTodoEditor({
  fixedT,
  fullHeight,
  open = true,
  todoPath,
  values,
  onBack,
  onChange,
}: CraftedTodoEditorProps) {
  const ct = Hooks.useFixedT(fixedT);

  return (
    <FullHeightCollapse
      aria-label="Todo Editor"
      fullHeight={fullHeight}
      in={open}
    >
      {onBack && (
        <WidgetAppBar
          type="events"
          ct={ct}
          description={todoPath}
          onBackToStructure={onBack}
        />
      )}
    </FullHeightCollapse>
  );
}
