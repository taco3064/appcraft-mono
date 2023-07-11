import * as Rf from 'reactflow';
import Paper from '@mui/material/Paper';
import _get from 'lodash.get';
import _set from 'lodash.set';
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
              onNodeClick={handleTodo.select}
              onNodesDelete={(nodes) => {
                if (values) {
                  nodes.forEach(({ id }) => {
                    delete values[id];

                    edges.forEach(({ source, sourceHandle }) => {
                      if (
                        sourceHandle &&
                        id === _get(values, [source, sourceHandle])
                      ) {
                        _set(values, [source, sourceHandle], '');
                      }
                    });
                  });
                }

                onChange({ ...values } as never);
              }}
              onConnect={({ source, sourceHandle, target }) => {
                if (source && values?.[source] && source !== target) {
                  onChange({
                    ...values,
                    [source]: {
                      ...values[source],
                      [sourceHandle as string]: target || null,
                    },
                  } as never);
                }
              }}
              onEdgeDoubleClick={(e, { source, sourceHandle }) => {
                if (values?.[source]) {
                  onChange({
                    ...values,
                    [source]: {
                      ...values[source],
                      [sourceHandle as string]: null,
                    },
                  } as never);
                }
              }}
            >
              <Rf.Background color={theme.palette.text.secondary} gap={16} />
            </Rf.ReactFlow>

            <Comp.TodoFlowControls ct={ct} onTodoAdd={handleTodo.create} />
          </Rf.ReactFlowProvider>
        </Paper>
      </FullHeightCollapse>
    </>
  );
}
