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
  version,
  widget,
  onWidgetChange,
}: Types.CraftedWidgetEditorProps) {
  const ct = Hooks.useFixedT(fixedT);
  const [adding, setAdding] = useState(false);

  const { breadcrumbs, items, paths, type, onPathsChange } = Hooks.useStructure(
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
        <Common.ListPlaceholder message={ct('msg-no-widgets')} />
      ) : (
        <>
          {widgets.map((item, index) => {
            const key =
              item.category === 'plainText'
                ? `plain_text_${index}`
                : `${item.typeFile}#${item.typeName}}`;

            return (
              <WidgetNode
                {...props}
                key={key}
                index={index}
                item={item}
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
          version={version}
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
            <Common.WidgetBreadcrumbs
              addable={type === 'node' || items.length < 1}
              breadcrumbs={breadcrumbs}
              fixedT={fixedT}
              onAdd={() => setAdding(true)}
              onRedirect={onPathsChange}
            />
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
                superiorNodeType={type}
                onClick={onWidgetSelect}
                onRemove={onWidgetRemove}
                onEventActive={(activePaths) =>
                  console.log([...paths, ...activePaths])
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
