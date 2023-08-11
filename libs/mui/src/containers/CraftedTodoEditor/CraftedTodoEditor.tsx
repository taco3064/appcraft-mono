import * as Rf from 'reactflow';
import AppBar from '@mui/material/AppBar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
import type { WidgetTodo } from '@appcraft/types';

import * as Comp from '../../components';
import * as Style from '../../styles';
import { CraftedTypeEditor } from '../CraftedTypeEditor';
import { getProps } from '../../utils';
import { useFixedT, useTodoGenerator } from '../../hooks';
import { useStateContext } from '../../contexts';
import type { CraftedTodoEditorProps } from './CraftedTodoEditor.types';

const EXCLUDE: RegExp[] = [
  /^id$/,
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
  HeaderProps,
  variant = 'popup',
  disableCategories,
  fixedT,
  fullHeight,
  typeFile = './node_modules/@appcraft/types/src/widgets/todo.types.d.ts',
  values,
  renderOverrideItem,
  onChange,
  onEditToggle,
  onFetchDefinition,
}: CraftedTodoEditorProps) {
  const theme = useTheme();
  const ct = useFixedT(fixedT);
  const { toggle } = useStateContext();

  const [{ editing, nodes, edges }, handleTodo] = useTodoGenerator(
    typeFile,
    values || {},
    { onChange, onEditToggle }
  );

  const handleNormalBack = () => {
    if (editing) {
      const { mixedTypes } = editing.config || {};
      const todo = getProps<WidgetTodo>(editing.config?.props);

      handleTodo.cancel();

      onChange({
        ...values,
        [todo.id]: !mixedTypes ? todo : { ...todo, mixedTypes },
      });
    }
  };

  return (
    <>
      {variant === 'popup' && (
        <Comp.MutationTodoNodeDialog
          ct={ct}
          open={Boolean(editing)}
          values={editing}
          onClose={handleTodo.cancel}
          onConfirm={(todo) => onChange({ ...values, [todo.id]: todo })}
          renderEditor={(todoConfig) => (
            <CraftedTypeEditor
              {...{ fixedT, renderOverrideItem, onFetchDefinition }}
              exclude={EXCLUDE}
              values={todoConfig}
              onChange={handleTodo.change}
            />
          )}
        />
      )}

      <Style.FlexContainer disableGutters fullHeight={fullHeight}>
        {HeaderProps && (
          <Style.WidgetAppBar
            action={toggle}
            BackButtonProps={{
              icon: <ArrowBackIcon />,
              text: ct('btn-back'),
              onClick: HeaderProps.onBack,
            }}
          >
            <Style.AutoBreakTypography
              primary={HeaderProps.primary}
              secondary={HeaderProps.secondary}
            />
          </Style.WidgetAppBar>
        )}

        {variant === 'normal' && editing && (
          <>
            <CraftedTypeEditor
              {...{ fixedT, renderOverrideItem, onFetchDefinition }}
              fullHeight
              exclude={EXCLUDE}
              values={editing.config}
              onChange={handleTodo.change}
            />

            <AppBar
              position="static"
              color="transparent"
              sx={(theme) => ({ padding: theme.spacing(1, 2) })}
            >
              <Toolbar disableGutters variant="dense">
                <Button
                  fullWidth
                  startIcon={<ArrowBackIcon />}
                  onClick={handleNormalBack}
                >
                  {ct('btn-back')}
                </Button>
              </Toolbar>
            </AppBar>
          </>
        )}

        {(variant === 'popup' || !editing) && (
          <Style.TodoBackground elevation={0}>
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
          </Style.TodoBackground>
        )}
      </Style.FlexContainer>
    </>
  );
}
