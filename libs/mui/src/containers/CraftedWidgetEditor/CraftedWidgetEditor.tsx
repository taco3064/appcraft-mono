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

  const [selected, handleMutation] = Hooks.useWidgetMutation(
    widget as Appcraft.RootNodeWidget,
    type === 'node',
    paths,
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

            return (
              <Comp.WidgetNode
                {...props}
                {...{ key, index, item }}
                event={events?.[key]}
                structure={nodes?.[key]}
              />
            );
          })}
        </>
      )
  );

  return (
    <>
      <Comp.WidgetAddDialog
        {...{ fixedT, renderWidgetTypeSelection }}
        disablePlaintext={paths.length === 0}
        open={adding}
        onClose={() => setAdding(false)}
        onConfirm={handleMutation.add}
      />

      <Comp.PlainTextDialog
        open={selected?.category === 'plainText'}
        values={selected as Appcraft.PlainTextWidget}
        onClose={() => handleMutation.select(null)}
        onConfirm={handleMutation.modify}
      />

      {selected?.category === 'node' && (
        <CraftedTypeEditor
          fixedT={fixedT}
          open={Boolean(selected)}
          parser={fetchOptions.parser}
          values={selected}
          onChange={handleMutation.modify}
          action={
            <Comp.WidgetAppBar
              description={selected.type.replace(/([A-Z])/g, ' $1')}
              onBackToStructure={() => handleMutation.select(null)}
            />
          }
        />
      )}

      <Collapse in={selected?.category !== 'node'}>
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
              addable={type === 'node' || items.length < 1}
              breadcrumbs={breadcrumbs}
              fixedT={fixedT}
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
                fixedT={fixedT}
                superiorNodeType={type}
                onClick={handleMutation.select}
                onRemove={handleMutation.remove}
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
