import _sum from 'lodash/sum';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import List from '@mui/material/List';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
import { Suspense, useState } from 'react';
import type * as Appcraft from '@appcraft/types';

import * as Comp from '../../components';
import * as Hook from '../../hooks';
import * as Style from '../../styles';
import { CraftedTodoEditor } from '../CraftedTodoEditor';
import { CraftedTypeEditor } from '../CraftedTypeEditor';
import { StateProvider } from '../../contexts';
import { getNodesAndEventsKey } from '../../utils';
import type * as Types from './CraftedWidgetEditor.types';

const STATE_EXCLUDE: RegExp[] = [];

export default function CraftedWidgetEditor({
  BackButtonProps,
  disableCategories,
  fixedT,
  stateTypeFile,
  todoTypeFile,
  version,
  widget,
  renderOverridePureItem,
  renderWidgetTypeSelection,
  onFetchNodesAndEvents,
  onFetchConfigDefinition,
  onFetchWidgetDefinition,
  onWidgetChange,
}: Types.CraftedWidgetEditorProps) {
  const ct = Hook.useFixedT(fixedT);
  const [newWidgetOpen, setNewWidgetOpen] = useState(false);
  const [stateOpen, setStateOpen] = useState(false);

  const stateToggle = (
    <Style.IconTipButton
      title={ct('btn-state')}
      onClick={() => setStateOpen(true)}
      disabled={
        !_sum(
          Object.values(widget?.state || {}).map(
            (state) => Object.keys(state).length
          )
        )
      }
    >
      <StorageRoundedIcon />
    </Style.IconTipButton>
  );

  const [{ breadcrumbs, items, paths, type }, onPathsChange] =
    Hook.useStructure(widget as Appcraft.RootNodeWidget);

  const [{ editedWidget, widgetPath, todoPath }, handleMutation] =
    Hook.useWidgetMutation(widget as Appcraft.RootNodeWidget, onWidgetChange);

  const LazyWidgetElements =
    Hook.useLazyWidgetElements<Types.LazyWidgetElementsProps>(
      items,
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
                  {...{ key, index, item, event, node }}
                  defaultOpen={item === widget}
                />
              );
            })}
          </>
        )
    );

  return (
    <>
      <Comp.MutationNewWidgetDialog
        {...{ ct, renderWidgetTypeSelection }}
        disablePlaintext={paths.length === 0}
        open={newWidgetOpen}
        onClose={() => setNewWidgetOpen(false)}
        onConfirm={(e) => handleMutation.add(e, type, paths)}
      />

      <Comp.MutationPlainTextDialog
        ct={ct}
        open={editedWidget?.category === 'plainText'}
        values={editedWidget as Appcraft.PlainTextWidget}
        onClose={() => handleMutation.editing(null)}
        onConfirm={handleMutation.modify}
      />

      <Comp.MutationStateDialog
        ct={ct}
        open={Boolean(widget && stateOpen)}
        typeFile={stateTypeFile}
        values={widget as Appcraft.RootNodeWidget}
        onClose={() => setStateOpen(false)}
        onConfirm={onWidgetChange}
        renderEditor={(stateConfig, onStateChange) => (
          <CraftedTypeEditor
            {...{ fixedT, renderOverridePureItem }}
            exclude={STATE_EXCLUDE}
            values={stateConfig}
            onChange={onStateChange}
            onFetchDefinition={onFetchConfigDefinition}
          />
        )}
      />

      <StateProvider
        basePath={widgetPath}
        toggle={stateToggle}
        values={widget}
        onChange={onWidgetChange}
      >
        {editedWidget?.category === 'node' && (
          <>
            <CraftedTypeEditor
              fullHeight
              fixedT={fixedT}
              open={Boolean(!todoPath)}
              values={editedWidget}
              renderOverridePureItem={renderOverridePureItem}
              onBack={() => handleMutation.editing(null)}
              onChange={handleMutation.modify}
              onFetchDefinition={onFetchWidgetDefinition}
            />

            <CraftedTodoEditor
              {...(todoPath && { todoPath })}
              fullHeight
              disableCategories={disableCategories}
              fixedT={fixedT}
              open={Boolean(todoPath)}
              typeFile={todoTypeFile}
              values={editedWidget.todos?.[todoPath as string]}
              renderOverridePureItem={renderOverridePureItem}
              onBack={() => handleMutation.editing(null)}
              onFetchDefinition={onFetchConfigDefinition}
              onChange={(todo) =>
                handleMutation.modify({
                  ...editedWidget,
                  todos: { ...editedWidget.todos, [todoPath as string]: todo },
                })
              }
            />
          </>
        )}

        <Style.FullHeightCollapse
          aria-label="Widget Structure"
          fullHeight
          in={editedWidget?.category !== 'node'}
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
                addable={type === 'node' || items.length < 1}
                onAdd={() => setNewWidgetOpen(true)}
                onRedirect={onPathsChange}
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
                  ct={ct}
                  superiorNodeType={type}
                  onClick={handleMutation.editing}
                  onEventActive={handleMutation.todo}
                  onNodeActive={onPathsChange}
                  onRemove={handleMutation.remove}
                />
              </Suspense>
            )}
          </List>
        </Style.FullHeightCollapse>
      </StateProvider>
    </>
  );
}
