import * as Rf from 'reactflow';
import AppBar from '@mui/material/AppBar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import _set from 'lodash/set';
import { ExhibitorUtil } from '@appcraft/exhibitor';
import { useTheme } from '@mui/material/styles';
import type { StructureProp, WidgetTodo } from '@appcraft/types';

import * as Comp from '../../components';
import * as Hook from '../../hooks';
import * as Style from '../../styles';
import { CraftedTypeEditor } from '../CraftedTypeEditor';
import { useLocalesContext } from '../../contexts';
import { useStateContext } from '../../contexts';
import type * as Types from './CraftedTodoEditor.types';
import type { FetchTypeDefinition } from '../../hooks';

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
  props: Comp.TodoFlowNode,
};

export default function CraftedTodoEditor({
  HeaderProps,
  variant = 'popup',
  disableCategories,
  fullHeight,
  typeFile = './node_modules/@appcraft/types/src/widgets/todo.types.d.ts',
  definitionSource,
  values,
  renderOverrideItem: defaultRenderOverrideItem,
  onChange,
  onEditToggle,
  onFetchData,
  onFetchDefinition,
  onFetchTodoWrapper,
}: Types.CraftedTodoEditorProps) {
  const theme = useTheme();
  const ct = useLocalesContext();
  const { toggle } = useStateContext();

  const [{ editing, nodes, edges }, handleTodo] = Hook.useTodoGenerator(
    typeFile,
    values || {},
    { onChange, onEditToggle }
  );

  const renderOverrideItem = Hook.useTodoOverride(
    values || {},
    editing?.todo.id,
    defaultRenderOverrideItem,
    {
      EVENT_PARAMS_PICKER: ({ disabled, label, value, onChange }) => {
        if (definitionSource) {
          return (
            <Comp.TodoInputSelect
              {...{ disabled, label, onChange }}
              source={definitionSource}
              value={value as string}
              onFetchDefinition={onFetchDefinition}
            />
          );
        }
      },
      VARIABLE_SOURCE: ({ options }) => {
        if (!definitionSource && options.type === 'oneOf') {
          _set(options, ['options'], ['output']);
        }
      },
      OUTPUT_PATH_PICKER: ({ disabled, label, value, onChange }) => (
        <Comp.TodoOutputSelect
          {...{
            disabled,
            edges,
            label,
            onChange,
            onFetchData,
            onFetchTodoWrapper,
          }}
          todos={values || {}}
          todoid={editing?.todo.id as string}
          value={(value || '') as string}
          onFetchTodoWrapper={(todoid) => onFetchTodoWrapper('todo', todoid)}
        />
      ),
    }
  );

  const handleNormalBack = () => {
    if (editing) {
      const { mixedTypes } = editing.config || {};
      const todo = ExhibitorUtil.getProps<WidgetTodo>(editing.config?.props);

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
          open={Boolean(editing)}
          values={editing}
          onClose={handleTodo.cancel}
          onConfirm={(todo) => onChange({ ...values, [todo.id]: todo })}
          renderEditor={(todoConfig) => (
            <CraftedTypeEditor
              exclude={EXCLUDE}
              renderOverrideItem={renderOverrideItem}
              values={todoConfig}
              onChange={handleTodo.change}
              onFetchDefinition={
                onFetchDefinition as FetchTypeDefinition<StructureProp>
              }
            />
          )}
        />
      )}

      <Style.FlexContainer
        disableGutters
        maxWidth={false}
        fullHeight={fullHeight}
      >
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
              primaryTypographyProps={{
                whiteSpace: 'nowrap',
              }}
              secondaryTypographyProps={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            />
          </Style.WidgetAppBar>
        )}

        {variant === 'normal' && editing && (
          <>
            <CraftedTypeEditor
              fullHeight
              exclude={EXCLUDE}
              renderOverrideItem={renderOverrideItem}
              values={editing.config}
              onChange={handleTodo.change}
              onFetchDefinition={
                onFetchDefinition as FetchTypeDefinition<StructureProp>
              }
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
                onTodoAdd={(...e) => {
                  onEditToggle?.(true);
                  handleTodo.create(...e);
                }}
              />
            </Rf.ReactFlowProvider>
          </Style.TodoBackground>
        )}
      </Style.FlexContainer>
    </>
  );
}
