import AddIcon from '@mui/icons-material/Add';
import AppBar from '@mui/material/AppBar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import LinearProgress from '@mui/material/LinearProgress';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Suspense, useState } from 'react';
import type * as Appcraft from '@appcraft/types';

import * as Common from '../common';
import * as Hooks from '../../hooks';
import * as Styles from '../../styles';
import { CraftedTypeEditor } from '../CraftedTypeEditor';
import { WidgetAddDialog } from '../WidgetAddDialog';
import { WidgetNode } from '../WidgetNode';
import type * as Types from './CraftedWidgetEditor.types';

export default function CraftedWidgetEditor({
  fetchOptions,
  fixedT,
  renderWidgetTypeSelection,
  widget,
  onWidgetChange,
}: Types.CraftedWidgetEditorProps) {
  const ct = Hooks.useFixedT(fixedT);
  const [adding, setAdding] = useState(false);
  const [isReactNode, setIsReactNode] = useState(false);

  const { items, paths, breadcrumbs, onPathsChange } = Hooks.useStructure(
    widget as Appcraft.NodeWidget
  );

  const {
    selected,
    onWidgetAdd,
    onWidgetModify,
    onWidgetRemove,
    onWidgetSelect,
  } = Hooks.useWidgetMutation(
    widget as Appcraft.RootNodeWidget,
    isReactNode,
    paths,
    onWidgetChange
  );

  const LazyWidgetNodes = Hooks.useLazyWidgetNodes<
    Appcraft.NodeAndEventProps,
    Types.LazyWidgetNodesProps
  >(
    fetchOptions.getNodesAndEvents,
    items,
    ({ fetchData: { events, nodes } = {}, widgets, ...props }) =>
      widgets.length === 0 ? (
        <Common.ListPlaceholder message={ct('msg-no-widgets')} />
      ) : (
        <>
          {widgets.map((item, index) => (
            <WidgetNode
              {...props}
              {...(paths.length && { index })}
              key={`item_${index}`}
              item={item}
              event={item.category === 'node' && events?.[item.typeName]}
              structure={item.category === 'node' && nodes?.[item.typeName]}
            />
          ))}
        </>
      )
  );

  return (
    <>
      <WidgetAddDialog
        {...{ fixedT, renderWidgetTypeSelection }}
        disablePlaintext={paths.length === 0}
        open={adding}
        onClose={() => setAdding(false)}
        onConfirm={onWidgetAdd}
      />

      <Common.PlainTextDialog
        open={selected?.category === 'plainText'}
        values={selected as Appcraft.PlainTextWidget}
        onClose={() => onWidgetSelect(null)}
        onConfirm={onWidgetModify}
      />

      {selected?.category === 'node' && (
        <CraftedTypeEditor
          fixedT={fixedT}
          open={Boolean(selected)}
          parser={fetchOptions.parser}
          values={selected}
          onChange={onWidgetModify}
          action={
            <Common.WidgetAppBar
              description={selected.type.replace(/([A-Z])/g, ' $1')}
              onBackToStructure={() => onWidgetSelect(null)}
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
            breadcrumbs.length > 0 && (
              <Styles.ListToolbar>
                <Styles.IconTipButton
                  title={ct('btn-back')}
                  onClick={() =>
                    onPathsChange(
                      breadcrumbs[breadcrumbs.length - 2]?.paths || []
                    )
                  }
                >
                  <ArrowBackIcon />
                </Styles.IconTipButton>

                <Common.Breadcrumbs
                  separator="›"
                  maxItems={2}
                  style={{ marginRight: 'auto' }}
                >
                  {breadcrumbs.map(({ text, paths: toPaths }, i, arr) => (
                    <Styles.Breadcrumb
                      key={`breadcrumb_${i}`}
                      brcVariant={i === arr.length - 1 ? 'text' : 'link'}
                      onClick={() => onPathsChange(toPaths)}
                    >
                      {text}
                    </Styles.Breadcrumb>
                  ))}
                </Common.Breadcrumbs>

                {(isReactNode || items.length < 1) && (
                  <Styles.IconTipButton
                    title={ct('btn-new-widget')}
                    size="small"
                    onClick={() => setAdding(true)}
                  >
                    <AddIcon />
                  </Styles.IconTipButton>
                )}
              </Styles.ListToolbar>
            )
          }
        >
          {!widget ? (
            <Common.ListPlaceholder
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
                onClick={onWidgetSelect}
                onEventActive={(item, propPath) =>
                  console.log(paths, item, propPath)
                }
                onNodeActive={(type, activePaths) => {
                  setIsReactNode(type === 'node');
                  onPathsChange([...paths, ...activePaths]);
                }}
                onRemove={onWidgetRemove}
              />
            </Suspense>
          )}
        </List>
      </Collapse>
    </>
  );
}
