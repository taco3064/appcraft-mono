import Paper from '@mui/material/Paper';
import ReactFlow, { Background, ReactFlowProvider } from 'reactflow';
import { useTheme } from '@mui/material/styles';

import * as Comp from '../../components';
import * as Hooks from '../../hooks';
import { CraftedTypeEditor } from '../CraftedTypeEditor';
import { FullHeightCollapse } from '../../styles';
import type { CraftedTodoEditorProps } from './CraftedTodoEditor.types';

export default function CraftedTodoEditor({
  fixedT,
  fullHeight,
  open = true,
  parser,
  todoPath,
  typeFile = './node_modules/@appcraft/types/src/widgets/todo.types.d.ts',
  values,
  onBack,
  onChange,
}: CraftedTodoEditorProps) {
  const theme = useTheme();
  const ct = Hooks.useFixedT(fixedT);

  const [{ editing, nodes, edges }, handleTodo] = Hooks.useTodoGenerator(
    typeFile,
    values
  );

  return (
    <>
      <Comp.MutationTodoNodeDialog
        ct={ct}
        open={Boolean(editing)}
        values={editing}
        onClose={handleTodo.cancel}
        onConfirm={(todo) => onChange({ ...values, [todo.id]: todo })}
        renderEditor={(todoConfig) => (
          <CraftedTypeEditor
            {...{ fixedT, parser }}
            values={todoConfig}
            onChange={handleTodo.change}
          />
        )}
      />

      <FullHeightCollapse
        aria-label="Todo Editor"
        fullHeight={fullHeight}
        in={open}
      >
        {onBack && (
          <Comp.WidgetAppBar
            type="events"
            ct={ct}
            description={todoPath}
            onBackToStructure={onBack}
          />
        )}

        <Paper
          elevation={0}
          sx={{
            position: 'relative',
            width: '100%',
            height: '100%',

            '& a[aria-label="React Flow attribution"]': {
              display: 'none !important',
            },
          }}
        >
          <ReactFlowProvider>
            <ReactFlow
              fitView
              nodes={nodes}
              edges={edges}
              onConnect={handleTodo.connect}
            >
              <Background color={theme.palette.text.secondary} gap={16} />
            </ReactFlow>

            <Comp.TodoFlowControls ct={ct} onTodoAdd={handleTodo.create} />
          </ReactFlowProvider>
        </Paper>
      </FullHeightCollapse>
    </>
  );
}
