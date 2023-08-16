import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import List from '@mui/material/List';
import MenuItem from '@mui/material/MenuItem';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
import _get from 'lodash/get';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Suspense, useState } from 'react';
import type * as Appcraft from '@appcraft/types';

import * as Comp from '../../components';
import * as Hook from '../../hooks';
import * as Style from '../../styles';
import { CraftedTodoEditor } from '../CraftedTodoEditor';
import { CraftedTypeEditor } from '../CraftedTypeEditor';
import { StateProvider } from '../../contexts';
import { getForceArray, getNodesAndEventsKey } from '../../utils';
import type * as Types from './CraftedWidgetEditor.types';

const getActiveType: Types.GetActiveType = ({
  editedWidgetCategory,
  stateOpen,
  todoPath,
}) => {
  if (stateOpen) {
    return 'state';
  } else if (editedWidgetCategory !== 'node') {
    return 'nodes';
  }

  return todoPath ? 'todos' : 'props';
};

export default function CraftedWidgetEditor({
  BackButtonProps,
  disableCategories,
  fixedT,
  stateTypeFile,
  todoTypeFile,
  version,
  widget,
  overrideNamingProps,
  renderOverrideItem,
  onFetchDefinition,
  onFetchNodesAndEvents,
  onFetchWidgetWrapper,
  onWidgetChange,
}: Types.CraftedWidgetEditorProps) {
  const ct = Hook.useFixedT(fixedT);
  const [newWidgetOpen, setNewWidgetOpen] = useState(false);
  const [stateOpen, setStateOpen] = useState(false);
  const [editedState, setEditedState] = useState<Hook.EditedState>();

  const todoNames = Hook.useTemplateTodos(
    widget as Appcraft.MainWidget,
    editedState,
    onFetchWidgetWrapper
  );

  const [{ breadcrumbs, childrenCound, paths, type }, onRedirect] =
    Hook.useStructure(widget as Appcraft.MainWidget);

  const [{ editedWidget, widgetPath, todoPath }, handleMutation] =
    Hook.useWidgetMutation(widget as Appcraft.MainWidget, onWidgetChange);

  const LazyWidgetElements =
    Hook.useLazyWidgetElements<Types.LazyWidgetElementsProps>(
      widget as Appcraft.MainWidget,
      paths,
      version,
      onFetchNodesAndEvents,
      ({ fetchData: { events, nodes } = {}, widgets, ...props }) =>
        widgets.length === 0 ? (
          <Style.ListPlaceholder message={ct('msg-no-widgets')} />
        ) : (
          <>
            {widgets.map((item, index) => {
              const key = getNodesAndEventsKey(item, `item_${index}`);
              const event = events?.[key];
              const node = nodes?.[key];

              return (
                <Comp.WidgetElement
                  {...props}
                  {...{ index, item, event, node }}
                  key={item.id}
                />
              );
            })}
          </>
        )
    );

  const active = getActiveType({
    editedWidgetCategory: editedWidget?.category,
    stateOpen: Boolean(widget && stateOpen),
    todoPath,
  });

  const stateEditorProps = Hook.useStateOverride(
    widget as Appcraft.MainWidget,
    editedState,
    { overrideNamingProps, renderOverrideItem },
    {
      TODO_NAMING: () =>
        todoNames.map((todoName) => (
          <MenuItem key={todoName} value={todoName}>
            {todoName}
          </MenuItem>
        )),
      TODO_EDITOR: ({ value, ...options }) => (
        <Comp.TodoItem
          {...options}
          {...{ ct, editedState }}
          value={value as Record<string, Appcraft.WidgetTodo>}
          renderTodoEditor={({ values, onChange, onEditToggle }) => (
            <CraftedTodoEditor
              {...{ fixedT, values, onChange, onEditToggle, onFetchDefinition }}
              fullHeight
              variant="normal"
              typeFile={todoTypeFile}
            />
          )}
        />
      ),
    }
  );

  const stateToggle = (
    <Style.IconTipButton
      title={ct('btn-state')}
      onClick={() => setStateOpen(true)}
    >
      <StorageRoundedIcon />
    </Style.IconTipButton>
  );

  return (
    <>
      <Comp.MutationNewWidgetDialog
        ct={ct}
        disablePlaintext={paths.length === 0}
        open={newWidgetOpen}
        onClose={() => setNewWidgetOpen(false)}
        onConfirm={(e) => handleMutation.add(e, type, paths)}
      />

      <Comp.MutationPlainTextDialog
        ct={ct}
        open={editedWidget?.category === 'plainText'}
        values={editedWidget as Appcraft.PlainTextWidget}
        onClose={() => handleMutation.editing()}
        onConfirm={handleMutation.modify}
      />

      {active === 'state' && (
        <Comp.WidgetState
          {...{ ct, onFetchDefinition }}
          typeFile={stateTypeFile}
          values={widget as Appcraft.MainWidget}
          onBack={() => setStateOpen(false)}
          onChange={onWidgetChange}
          onStateEdit={setEditedState}
          renderEditor={(props) => (
            <CraftedTypeEditor {...props} {...stateEditorProps} fullHeight />
          )}
        />
      )}

      {active === 'todos' && editedWidget?.category === 'node' && (
        <CraftedTodoEditor
          {...(todoPath && { todoPath })}
          {...{
            fixedT,
            disableCategories,
            overrideNamingProps,
            renderOverrideItem,
            onFetchDefinition,
          }}
          fullHeight
          typeFile={todoTypeFile}
          values={editedWidget.todos?.[todoPath as string]}
          onChange={(todo) =>
            handleMutation.modify({
              ...editedWidget,
              todos: { ...editedWidget.todos, [todoPath as string]: todo },
            })
          }
          HeaderProps={{
            primary: ct('ttl-events'),
            secondary: todoPath || undefined,
            onBack: () => handleMutation.editing(),
          }}
        />
      )}

      <StateProvider
        basePath={widgetPath}
        toggle={stateToggle}
        values={widget}
        onChange={onWidgetChange}
      >
        {active === 'props' && editedWidget?.category === 'node' && (
          <CraftedTypeEditor
            {...{
              fixedT,
              overrideNamingProps,
              renderOverrideItem,
              onFetchDefinition,
            }}
            fullHeight
            values={editedWidget}
            onChange={handleMutation.modify}
            HeaderProps={{
              primary: ct('ttl-props'),
              secondary: editedWidget.type.replace(/([A-Z])/g, ' $1'),
              onBack: () => handleMutation.editing(),
            }}
          />
        )}

        <Style.FullHeightCollapse
          aria-label="Widget Structure"
          fullHeight
          in={active === 'nodes'}
        >
          <Style.WidgetAppBar
            BackButtonProps={BackButtonProps}
            action={stateToggle}
          >
            {ct('ttl-structure')}
          </Style.WidgetAppBar>

          <List
            disablePadding
            subheader={
              <Comp.WidgetBreadcrumbs
                {...{ breadcrumbs, ct }}
                addable={type === 'node' || childrenCound < 1}
                onAdd={() => setNewWidgetOpen(true)}
                onRedirect={onRedirect}
              />
            }
          >
            {!widget ? (
              <Style.ListPlaceholder
                message={ct('msg-no-widget')}
                action={
                  <Button
                    color="primary"
                    size="large"
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setNewWidgetOpen(true)}
                  >
                    {ct('btn-new-widget')}
                  </Button>
                }
              />
            ) : (
              <Suspense fallback={<LinearProgress />}>
                <DndProvider backend={HTML5Backend}>
                  <LazyWidgetElements
                    basePaths={paths}
                    ct={ct}
                    superiorNodeType={type}
                    onClick={handleMutation.editing}
                    onDndMove={(...e) => handleMutation.resort(paths, ...e)}
                    onEventActive={handleMutation.todo}
                    onNodeActive={onRedirect}
                    onRemove={handleMutation.remove}
                    widgets={getForceArray(
                      !paths.length ? widget : _get(widget, paths)
                    )}
                  />
                </DndProvider>
              </Suspense>
            )}
          </List>
        </Style.FullHeightCollapse>
      </StateProvider>
    </>
  );
}
