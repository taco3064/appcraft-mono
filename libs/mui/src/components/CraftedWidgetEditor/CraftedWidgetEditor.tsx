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

  const { isMultiChildren, items, paths, breadcrumbs, onNodeActive } =
    Hooks.useStructure(widget as Appcraft.NodeWidget);

  const [
    selected,
    { onWidgetAdd, onWidgetModify, onWidgetRemove, onWidgetSelect },
  ] = Hooks.useWidgetMutation(
    widget as Appcraft.RootNodeWidget,
    isMultiChildren,
    paths,
    onWidgetChange
  );

  const LazyWidgetNodes = Hooks.useLazyWidgetNodes<
    Appcraft.WidgetStructure,
    Types.LazyWidgetNodesProps<typeof onNodeActive>
  >(fetchOptions.nodes, items, ({ fetchData, widgets, onActive, ...props }) =>
    widgets.length === 0 ? (
      <Common.ListPlaceholder message={ct('msg-no-widgets')} />
    ) : (
      <>
        {widgets.map((item, index) => (
          <WidgetNode
            {...props}
            key={`item_${index}`}
            item={item}
            structure={item.category === 'node' && fetchData?.[item.typeName]}
            onActive={(type, propPath) =>
              item.category === 'node' &&
              onActive({
                type: item.type,
                isMultiChildren: type === 'node',
                propPath,
                index,
              })
            }
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

      <Collapse in={Boolean(!selected)}>
        <AppBar color="default" position="sticky">
          <Toolbar variant="regular">
            <Typography variant="subtitle1" fontWeight="bolder" color="primary">
              {ct('ttl-structure')}
            </Typography>
          </Toolbar>
        </AppBar>

        <List
          subheader={
            breadcrumbs.length > 0 && (
              <Styles.ListToolbar>
                <Styles.IconTipButton
                  title={ct('btn-back')}
                  onClick={() => onNodeActive(breadcrumbs.length - 1)}
                >
                  <ArrowBackIcon />
                </Styles.IconTipButton>

                <Common.Breadcrumbs
                  separator="›"
                  maxItems={2}
                  style={{ marginRight: 'auto' }}
                >
                  {breadcrumbs.map((text, i, arr) => (
                    <Styles.Breadcrumb
                      key={`breadcrumb_${i}`}
                      brcVariant={i === arr.length - 1 ? 'text' : 'link'}
                      onClick={() => onNodeActive(i + 1)}
                    >
                      {text}
                    </Styles.Breadcrumb>
                  ))}
                </Common.Breadcrumbs>

                {(isMultiChildren || items.length < 1) && (
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
                onActive={onNodeActive}
                onRemove={onWidgetRemove}
                onClick={onWidgetSelect}
              />
            </Suspense>
          )}
        </List>
      </Collapse>
    </>
  );
}
