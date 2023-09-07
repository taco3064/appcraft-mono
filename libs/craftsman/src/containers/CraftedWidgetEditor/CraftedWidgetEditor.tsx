import * as Dnd from '@dnd-kit/core';
import * as Sortable from '@dnd-kit/sortable';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import List from '@mui/material/List';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
import _get from 'lodash/get';
import { Suspense, useState } from 'react';
import type { PlainTextWidget } from '@appcraft/types';

import * as Comp from '../../components';
import * as Hook from '../../hooks';
import * as Style from '../../styles';
import { CraftedTodoEditor } from '../CraftedTodoEditor';
import { CraftedTypeEditor } from '../CraftedTypeEditor';
import { StateProvider, useLocalesContext } from '../../contexts';
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
  disableState = false,
  disableTodoCategories,
  stateTypeFile,
  title,
  todoTypeFile,
  version,
  widget,
  isAllowedToAddWidget = () => true,
  overrideMixedOptions,
  overrideNamingProps,
  renderNewWidgetDialog,
  renderOverrideItem,
  onFetchData,
  onFetchDefinition,
  onFetchNodesAndEvents,
  onFetchWrapper,
  onWidgetChange,
}: Types.CraftedWidgetEditorProps) {
  const ct = useLocalesContext();
  const [newWidgetOpen, setNewWidgetOpen] = useState(false);
  const [stateOpen, setStateOpen] = useState(false);

  const sensors = Dnd.useSensors(
    Dnd.useSensor(Dnd.MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    Dnd.useSensor(Dnd.TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  const [{ breadcrumbs, childrenCount, paths, type }, onRedirect] =
    Hook.useStructure(widget);

  const [{ editedWidget, widgetPath, todoPath }, handleMutation] =
    Hook.useWidgetMutation(widget, onWidgetChange);

  const LazyWidgetElements =
    Hook.useLazyWidgetElements<Types.LazyWidgetElementsProps>(
      widget,
      paths,
      version,
      onFetchNodesAndEvents,
      ({ fetchData: { events, nodes } = {}, widgets, ...props }) =>
        widgets.length === 0 ? (
          <Style.ListPlaceholder message={ct('msg-no-widgets')} />
        ) : (
          <Dnd.DndContext
            sensors={sensors}
            onDragEnd={(e) => handleMutation.resort(paths, e)}
          >
            <Sortable.SortableContext
              items={widgets}
              strategy={Sortable.verticalListSortingStrategy}
            >
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
            </Sortable.SortableContext>
          </Dnd.DndContext>
        )
    );

  const active = getActiveType({
    editedWidgetCategory: editedWidget?.category,
    stateOpen: Boolean(widget && stateOpen),
    todoPath,
  });

  const stateToggle = (
    <Style.IconTipButton
      title={ct('btn-state')}
      disabled={!widget?.state}
      onClick={() => setStateOpen(true)}
    >
      <StorageRoundedIcon />
    </Style.IconTipButton>
  );

  return (
    <>
      {renderNewWidgetDialog ? (
        renderNewWidgetDialog({
          type,
          paths,
          open: newWidgetOpen,
          onClose: () => setNewWidgetOpen(false),
        })
      ) : (
        <Comp.MutationNewWidgetDialog
          disablePlaintext={paths.length === 0}
          open={newWidgetOpen}
          onClose={() => setNewWidgetOpen(false)}
          onConfirm={(e) => handleMutation.add(e, type, paths)}
        />
      )}

      <Comp.MutationPlainTextDialog
        open={editedWidget?.category === 'plainText'}
        values={editedWidget as PlainTextWidget}
        onClose={() => handleMutation.editing()}
        onConfirm={handleMutation.modify}
      />

      {active === 'state' && (
        <Comp.WidgetState
          typeFile={stateTypeFile}
          values={widget}
          onBack={() => setStateOpen(false)}
          onChange={onWidgetChange}
          onFetchDefinition={onFetchDefinition}
          renderEditor={(props) => (
            <CraftedTypeEditor
              {...props}
              {...{
                overrideMixedOptions,
                overrideNamingProps,
                renderOverrideItem,
              }}
              fullHeight
            />
          )}
        />
      )}

      {active === 'todos' && editedWidget?.category === 'node' && (
        <CraftedTodoEditor
          {...(todoPath && { todoPath })}
          {...{
            overrideNamingProps,
            renderOverrideItem,
            onFetchData,
            onFetchDefinition,
          }}
          fullHeight
          disableCategories={disableTodoCategories}
          typeFile={todoTypeFile}
          values={editedWidget.todos?.[todoPath as string]}
          onFetchTodoWrapper={onFetchWrapper}
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
        disabled={disableState}
        toggle={stateToggle}
        values={widget}
        onChange={onWidgetChange}
      >
        {active === 'props' && editedWidget?.category === 'node' && (
          <CraftedTypeEditor
            {...{
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
            action={disableState ? null : stateToggle}
          >
            {title || ct('ttl-structure')}
          </Style.WidgetAppBar>

          <List
            disablePadding
            subheader={
              <Comp.WidgetBreadcrumbs
                {...{ breadcrumbs, ct }}
                onAdd={() => setNewWidgetOpen(true)}
                onRedirect={onRedirect}
                addable={
                  isAllowedToAddWidget({
                    childrenCount,
                    paths,
                    type,
                    owner:
                      (editedWidget?.category === 'node' && editedWidget) ||
                      undefined,
                  }) &&
                  (type === 'node' || childrenCount < 1)
                }
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
                <LazyWidgetElements
                  basePaths={paths}
                  superiorNodeType={type}
                  onClick={handleMutation.editing}
                  onEventActive={handleMutation.todo}
                  onNodeActive={onRedirect}
                  onRemove={handleMutation.remove}
                  widgets={getForceArray(
                    !paths.length ? widget : _get(widget, paths)
                  )}
                />
              </Suspense>
            )}
          </List>
        </Style.FullHeightCollapse>
      </StateProvider>
    </>
  );
}
