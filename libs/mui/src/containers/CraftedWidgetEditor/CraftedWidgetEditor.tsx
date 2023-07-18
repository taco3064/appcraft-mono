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
import * as Hooks from '../../hooks';
import * as Styles from '../../styles';
import { CraftedTodoEditor } from '../CraftedTodoEditor';
import { CraftedTypeEditor } from '../CraftedTypeEditor';
import { getNodesAndEventsKey } from '../../utils';
import type * as Types from './CraftedWidgetEditor.types';

export default function CraftedWidgetEditor({
  fixedT,
  renderWidgetTypeSelection,
  todoTypeFile,
  version,
  widget,
  onFetchNodesAndEvents,
  onFetchConfigDefinition,
  onFetchWidgetDefinition,
  onWidgetChange,
}: Types.CraftedWidgetEditorProps) {
  const ct = Hooks.useFixedT(fixedT);
  const [adding, setAdding] = useState(false);

  const [{ breadcrumbs, items, paths, type }, onPathsChange] =
    Hooks.useStructure(widget as Appcraft.NodeWidget);

  const [{ editedWidget, todoPath }, handleMutation] = Hooks.useWidgetMutation(
    widget as Appcraft.RootNodeWidget,
    onWidgetChange
  );

  const LazyWidgetNodes = Hooks.useLazyWidgetNodes<Types.LazyWidgetNodesProps>(
    items,
    version,
    onFetchNodesAndEvents,
    ({ fetchData: { events, nodes } = {}, widgets, ...props }) =>
      widgets.length === 0 ? (
        <Styles.ListPlaceholder message={ct('msg-no-widgets')} />
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
        open={adding}
        onClose={() => setAdding(false)}
        onConfirm={(e) => handleMutation.add(e, type, paths)}
      />

      <Comp.MutationPlainTextDialog
        ct={ct}
        open={editedWidget?.category === 'plainText'}
        values={editedWidget as Appcraft.PlainTextWidget}
        onClose={() => handleMutation.editing(null)}
        onConfirm={handleMutation.modify}
      />

      {editedWidget?.category === 'node' && (
        <>
          <CraftedTypeEditor
            fullHeight
            fixedT={fixedT}
            open={Boolean(!todoPath)}
            values={editedWidget}
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

      <Styles.FullHeightCollapse
        aria-label="Widget Structure"
        fullHeight
        in={editedWidget?.category !== 'node'}
      >
        <AppBar color="default" position="sticky">
          <Toolbar
            variant="regular"
            style={{ justifyContent: 'space-between' }}
          >
            <Typography variant="subtitle1" fontWeight="bolder" color="primary">
              {ct('ttl-structure')}
            </Typography>

            <Styles.IconTipButton
              size="large"
              color="primary"
              title={ct('btn-state-props-mgr')}
            >
              <StorageRoundedIcon />
            </Styles.IconTipButton>
          </Toolbar>
        </AppBar>

        <List
          disablePadding
          subheader={
            <Comp.WidgetBreadcrumbs
              {...{ breadcrumbs, ct }}
              addable={type === 'node' || items.length < 1}
              onAdd={() => setAdding(true)}
              onRedirect={onPathsChange}
            />
          }
        >
          {!widget ? (
            <Styles.ListPlaceholder
              message={ct('msg-no-widget')}
              action={
                <Button
                  color="primary"
                  size="large"
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => setAdding(true)}
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
      </Styles.FullHeightCollapse>
    </>
  );
}
