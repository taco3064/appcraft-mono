import * as Rf from 'reactflow';
import AppBar from '@mui/material/AppBar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import _get from 'lodash/get';
import _toPath from 'lodash/toPath';
import { ExhibitorUtil, useLazyWidgetNav } from '@appcraft/exhibitor';
import { useMemo } from 'react';
import { useTheme } from '@mui/material/styles';
import type * as Appcraft from '@appcraft/types';

import * as Comp from '../../components';
import * as Hook from '../../hooks';
import * as Style from '../../styles';
import { CraftedTypeEditor } from '../CraftedTypeEditor';
import { getTodoCollectionPath, getTodosInfo } from '../../utils';
import { useLocalesContext } from '../../contexts';
import { useSelectionAction } from '../../contexts';
import type * as Types from './CraftedTodoEditor.types';
import type { FetchTypeDefinition } from '../../hooks';
import type { GeneratedOverride } from '../../utils';
import type { TodoOutputSelectProps } from '../../components';

//* Variables
const EXCLUDE: RegExp[] = [
  /^id$/,
  /^category$/,
  /^mixedTypes$/,
  /^defaultNextTodo$/,
  /^metTodo$/,
  /^iterateTodo$/,
];

//* @WidgetTodo
const NODE_TYPES: Rf.NodeTypes = {
  branch: Comp.TodoFlowNode,
  fetch: Comp.TodoFlowNode,
  iterate: Comp.TodoFlowNode,
  props: Comp.TodoFlowNode,
  search: Comp.TodoFlowNode,
  state: Comp.TodoFlowNode,
  variable: Comp.TodoFlowNode,
  wrap: Comp.TodoFlowNode,
};

//* Components
export default function CraftedTodoEditor({
  GeneratedOverrideProps,
  HeaderProps,
  disableCategories,
  fullHeight,
  typeFile = './node_modules/@appcraft/types/src/widgets/todo.types.d.ts',
  values,
  variant = 'popup',
  renderOverrideItem: defaultRenderOverrideItem,
  onChange,
  onEditToggle,
  onFetchData,
  onFetchDefinition,
  onFetchWrapper,
}: Types.CraftedTodoEditorProps) {
  const action = useSelectionAction();
  const theme = useTheme();
  const ct = useLocalesContext();
  const stringify = JSON.stringify(GeneratedOverrideProps || {});

  const { widget, renderedWidget, todoProps, source } = useMemo(() => {
    const generated = JSON.parse(stringify) as GeneratedOverride;
    const { layout, widget } = generated;

    return {
      widget,
      todoProps: getTodosInfo(generated),
      renderedWidget: layout ? [layout] : (widget as Appcraft.MainWidget),
      source: !widget
        ? undefined
        : {
            typeFile: widget?.typeFile,
            typeName: widget?.typeName,
            mixedTypes: widget?.mixedTypes,
            collectionPath: getTodoCollectionPath(generated),
          },
    };
  }, [stringify]);

  const [{ editing, nodes, edges }, handleTodo] = Hook.useTodoGenerator(
    typeFile,
    values || {},
    { onChange, onEditToggle }
  );

  //* Event Handlers
  const handleNormalBack = () => {
    if (editing) {
      const { mixedTypes } = editing.config || {};

      const todo = ExhibitorUtil.getProps<Appcraft.WidgetTodo>(
        editing.config?.props
      );

      handleTodo.cancel();

      onChange({
        ...values,
        [todo.id]: !mixedTypes ? todo : { ...todo, mixedTypes },
      });
    }
  };

  const handleSourceChange = (propPath: string, source: string) => {
    if (!editing?.config) {
      return;
    }

    const { props } = editing.config;
    const paths = _toPath(propPath.replace(/\.source$/, '.path'));

    delete props?.[ExhibitorUtil.getPropPath(paths)];

    handleTodo.change({
      ...editing.config,
      props: {
        ...props,
        [propPath]: source,
      },
    });
  };

  //* Component Nodes
  const LazyTodoOutputSelect = useLazyWidgetNav<TodoOutputSelectProps>(
    renderedWidget,
    onFetchWrapper,
    ({ TodoProps, defaultTodos: defaults, fetchData, ...props }) => {
      const defaultTodos = _get(
        (widget && fetchData?.('type', widget)) || widget,
        ['todos', TodoProps.eventName]
      );

      return (
        <Comp.TodoOutputSelect
          {...props}
          TodoProps={TodoProps}
          defaultTodos={GeneratedOverrideProps ? defaultTodos : defaults}
        />
      );
    }
  );

  const renderOverrideItem = Hook.useTodoOverride(
    values || {},
    editing?.todo.id,
    defaultRenderOverrideItem,
    {
      EVENT_PARAMS_PICKER: ({ disabled, label, value, onChange }) =>
        (source && (
          <Comp.TodoInputSelect
            {...{ disabled, label, source, onChange, onFetchDefinition }}
            value={value as string}
          />
        )) ||
        false,

      OUTPUT_PATH_PICKER: ({ disabled, label, value, onChange }) =>
        (editing?.todo.id && (
          <LazyTodoOutputSelect
            {...{ disabled, label, onChange, onFetchData }}
            defaultTodos={values}
            value={(value || '') as string}
            onFetchTodoWrapper={onFetchWrapper}
            TodoProps={{
              ...todoProps,
              id: editing.todo.id,
            }}
          />
        )) ||
        false,

      VARIABLE_SOURCE: ({ disabled, label, value, propPath, options }) =>
        (options.type === 'oneOf' && (
          <Comp.TodoSourceSelect
            {...{ disabled, label }}
            value={value as string}
            onChange={(e) => handleSourceChange(propPath, e)}
            options={options.options?.filter(
              (opt) =>
                (GeneratedOverrideProps?.widget &&
                  GeneratedOverrideProps?.todoPath) ||
                opt !== 'event'
            )}
          />
        )) ||
        false,
    }
  );

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
                onFetchDefinition as FetchTypeDefinition<Appcraft.StructureProp>
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
            action={action}
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
                onFetchDefinition as FetchTypeDefinition<Appcraft.StructureProp>
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
