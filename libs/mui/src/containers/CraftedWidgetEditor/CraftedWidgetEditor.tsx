import AddIcon from '@mui/icons-material/Add';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import LinearProgress from '@mui/material/LinearProgress';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Suspense, useState } from 'react';
import type * as Appcraft from '@appcraft/types';

import * as Comp from '../../components';
import * as Hooks from '../../hooks';
import { CraftedTodoEditor } from '../CraftedTodoEditor';
import { CraftedTypeEditor } from '../CraftedTypeEditor';
import { ListPlaceholder } from '../../styles';
import { getNodesAndEventsKey } from '../../services';
import type * as Types from './CraftedWidgetEditor.types';

export default function CraftedWidgetEditor({
  fetchOptions,
  fixedT,
  renderWidgetTypeSelection,
  version,
  widget,
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
    fetchOptions.getNodesAndEvents,
    items,
    version,
    ({ fetchData: { events, nodes } = {}, widgets, ...props }) =>
      widgets.length === 0 ? (
        <ListPlaceholder message={ct('msg-no-widgets')} />
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
      <Comp.WidgetAddDialog
        {...{ ct, renderWidgetTypeSelection }}
        disablePlaintext={paths.length === 0}
        open={adding}
        onClose={() => setAdding(false)}
        onConfirm={(e) => handleMutation.add(e, type, paths)}
      />

      <Comp.PlainTextDialog
        ct={ct}
        open={editedWidget?.category === 'plainText'}
        values={editedWidget as Appcraft.PlainTextWidget}
        onClose={() => handleMutation.editing(null)}
        onConfirm={handleMutation.modify}
      />

      <CraftedTypeEditor
        fixedT={fixedT}
        open={Boolean(!todoPath && editedWidget?.category === 'node')}
        parser={fetchOptions.parser}
        values={editedWidget as Appcraft.NodeWidget}
        onBack={() => handleMutation.editing(null)}
        onChange={handleMutation.modify}
      />

      <CraftedTodoEditor
        fixedT={fixedT}
        open={Boolean(todoPath && editedWidget?.category === 'node')}
        todoPath={todoPath || undefined}
        values={editedWidget as Appcraft.NodeWidget}
        onBack={() => handleMutation.editing(null)}
        onChange={handleMutation.modify}
      />

      <Collapse in={editedWidget?.category !== 'node'}>
        <AppBar color="default" position="sticky">
          <Toolbar variant="regular">
            <Typography variant="subtitle1" fontWeight="bolder" color="primary">
              {ct('ttl-structure')}
            </Typography>
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
            <ListPlaceholder
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
                onRemove={(removedPaths) =>
                  handleMutation.remove([...paths, ...removedPaths])
                }
                onEventActive={(activePaths) =>
                  handleMutation.todo([...paths, ...activePaths])
                }
                onNodeActive={(activePaths, activeNodeType) =>
                  onPathsChange([...paths, ...activePaths], activeNodeType)
                }
              />
            </Suspense>
          )}
        </List>
      </Collapse>
    </>
  );
}
