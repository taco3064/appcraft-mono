import * as Rf from 'reactflow';
import { useTheme } from '@mui/material/styles';

import * as Comp from '../../components';
import * as Hooks from '../../hooks';
import { CraftedTypeEditor } from '../CraftedTypeEditor';
import { FullHeightCollapse, TodoBackground } from '../../styles';
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
    values || {},
    onChange
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

        <TodoBackground elevation={0}>
          <Rf.ReactFlowProvider>
            <Rf.ReactFlow
              fitView
              nodes={nodes}
              edges={edges}
              defaultEdgeOptions={{
                type: 'smoothstep',
                markerEnd: { type: Rf.MarkerType.ArrowClosed },
                style: { strokeWidth: 2 },
              }}
              nodeTypes={{
                variable: Comp.TodoFlowNode,
                fetch: Comp.TodoFlowNode,
                branch: Comp.TodoFlowNode,
                iterate: Comp.TodoFlowNode,
              }}
              onConnect={handleTodo.connect}
              onEdgeDoubleClick={handleTodo.deleteEdge}
              onNodeClick={handleTodo.select}
              onNodesDelete={handleTodo.deleteNode}
            >
              <Rf.Background color={theme.palette.text.secondary} gap={16} />
            </Rf.ReactFlow>

            <Comp.TodoFlowControls ct={ct} onTodoAdd={handleTodo.create} />
          </Rf.ReactFlowProvider>
        </TodoBackground>
      </FullHeightCollapse>
    </>
  );
}
