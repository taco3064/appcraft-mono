import * as Rf from 'reactflow';
import { useTheme } from '@mui/material/styles';

import * as Comp from '../../components';
import { CraftedTypeEditor } from '../CraftedTypeEditor';
import { FullHeightCollapse, TodoBackground } from '../../styles';
import { useFixedT, useTodoGenerator } from '../../hooks';
import type { CraftedTodoEditorProps } from './CraftedTodoEditor.types';

const EXCLUDE: RegExp[] = [
  /^category$/,
  /^mixedTypes$/,
  /^defaultNextTodo$/,
  /^metTodo$/,
  /^iterateTodo$/,
];

const NODE_TYPES: Rf.NodeTypes = {
  variable: Comp.TodoFlowNode,
  fetch: Comp.TodoFlowNode,
  branch: Comp.TodoFlowNode,
  iterate: Comp.TodoFlowNode,
  wrap: Comp.TodoFlowNode,
  state: Comp.TodoFlowNode,
};

export default function CraftedTodoEditor({
  disableCategories,
  fixedT,
  fullHeight,
  open = true,
  todoPath,
  typeFile = './node_modules/@appcraft/types/src/widgets/todo.types.d.ts',
  values,
  renderOverridePureItem,
  onBack,
  onChange,
  onFetchDefinition,
}: CraftedTodoEditorProps) {
  const theme = useTheme();
  const ct = useFixedT(fixedT);

  const [{ editing, nodes, edges }, handleTodo] = useTodoGenerator(
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
            {...{ fixedT, renderOverridePureItem, onFetchDefinition }}
            exclude={EXCLUDE}
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

        {open && (
          <TodoBackground elevation={0}>
            <Rf.ReactFlowProvider>
              <Rf.ReactFlow
                fitView
                connectionLineType={Rf.ConnectionLineType.SmoothStep}
                nodes={nodes}
                edges={edges}
                nodeTypes={NODE_TYPES}
                onConnect={handleTodo.connect}
                onEdgeDoubleClick={handleTodo.deleteEdge}
                onNodeClick={handleTodo.select}
                onNodesDelete={handleTodo.deleteNode}
                defaultEdgeOptions={{
                  type: Rf.ConnectionLineType.SmoothStep,
                  markerEnd: { type: Rf.MarkerType.ArrowClosed },
                  style: { strokeWidth: 2 },
                }}
              >
                <Rf.Background color={theme.palette.text.secondary} gap={16} />
              </Rf.ReactFlow>

              <Comp.TodoFlowControls
                {...{ ct, disableCategories }}
                onTodoAdd={handleTodo.create}
              />
            </Rf.ReactFlowProvider>
          </TodoBackground>
        )}
      </FullHeightCollapse>
    </>
  );
}
