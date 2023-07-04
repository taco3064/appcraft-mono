import Paper from '@mui/material/Paper';
import ReactFlow, { Background, Controls } from 'reactflow';
import { useTheme } from '@mui/material/styles';

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
  const theme = useTheme();
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

      <Paper
        elevation={0}
        sx={{
          width: '100%',
          height: '100%',
          '& a[aria-label="React Flow attribution"]': {
            display: 'none !important',
          },
        }}
      >
        <ReactFlow fitView>
          <Controls />
          <Background color={theme.palette.text.secondary} gap={16} />
        </ReactFlow>
      </Paper>
    </FullHeightCollapse>
  );
}
