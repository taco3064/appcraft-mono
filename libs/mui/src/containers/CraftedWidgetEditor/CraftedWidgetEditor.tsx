import AddIcon from '@mui/icons-material/Add';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import List from '@mui/material/List';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
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

export default function CraftedWidgetEditor({
  fixedT,
  renderWidgetTypeSelection,
  todoTypeFile,
  version,
  widget,
  renderOverridePureItem,
  onFetchNodesAndEvents,
  onFetchConfigDefinition,
  onFetchWidgetDefinition,
  onWidgetChange,
}: Types.CraftedWidgetEditorProps) {
  const ct = Hook.useFixedT(fixedT);
  const [newWidgetOpen, setNewWidgetOpen] = useState(false);
  const [stateMgrOpen, setStateMgrOpen] = useState(false);

  const [{ breadcrumbs, items, paths, type }, onPathsChange] =
    Hook.useStructure(widget as Appcraft.NodeWidget);

  const [{ editedWidget, widgetPath, todoPath }, handleMutation] =
    Hook.useWidgetMutation(widget as Appcraft.RootNodeWidget, onWidgetChange);

  const LazyWidgetNodes = Hook.useLazyWidgetNodes<Types.LazyWidgetNodesProps>(
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
            const structure = nodes?.[key];

            return (
              <Comp.WidgetNode
                {...props}
                {...{ key, index, item, event, structure }}
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
        open={stateMgrOpen}
        values={widget}
        onClose={() => setStateMgrOpen(false)}
        onConfirm={onWidgetChange}
      />

      <StateProvider
        basePath={widgetPath}
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
          <AppBar color="default" position="sticky">
            <Toolbar
              variant="regular"
              style={{ justifyContent: 'space-between' }}
            >
              <Typography
                variant="subtitle1"
                fontWeight="bolder"
                color="primary"
              >
                {ct('ttl-structure')}
              </Typography>

              <Style.IconTipButton
                size="large"
                title={ct('btn-state-mgr')}
                onClick={() => setStateMgrOpen(true)}
              >
                <StorageRoundedIcon />
              </Style.IconTipButton>
            </Toolbar>
          </AppBar>

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
                <LazyWidgetNodes
                  ct={ct}
                  superiorNodeType={type}
                  onClick={(editedPaths) =>
                    handleMutation.editing([...paths, ...editedPaths])
                  }
                  onEventActive={(activePaths) =>
                    handleMutation.todo([...paths, ...activePaths])
                  }
                  onNodeActive={(activePaths, activeNodeType) =>
                    onPathsChange([...paths, ...activePaths], activeNodeType)
                  }
                  onRemove={(removedPaths) =>
                    handleMutation.remove([...paths, ...removedPaths])
                  }
                />
              </Suspense>
            )}
          </List>
        </Style.FullHeightCollapse>
      </StateProvider>
    </>
  );
}
