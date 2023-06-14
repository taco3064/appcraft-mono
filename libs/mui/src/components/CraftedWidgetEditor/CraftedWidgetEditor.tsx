import AddIcon from '@mui/icons-material/Add';
import AppBar from '@mui/material/AppBar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import LinearProgress from '@mui/material/LinearProgress';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { Suspense, useState } from 'react';
import type * as Appcraft from '@appcraft/types';

import * as Hooks from '../../hooks';
import * as Styles from '../../styles';
import { CraftedTypeEditor } from '../CraftedTypeEditor';
import { ListPlaceholder } from '../common';
import { WidgetAddDialog } from '../WidgetAddDialog';
import { WidgetAppBar } from '../WidgetAppBar';
import { WidgetNode } from '../WidgetNode';
import { useFixedT } from '../../contexts';
import type * as Types from './CraftedWidgetEditor.types';

export default function CraftedWidgetEditor({
  defaultValues, //! defaultProps - 尚未完成
  disableSelection,
  fetchOptions,
  fixedT,
  widget,
  renderWidgetTypeSelection,
  onWidgetChange,
}: Types.CraftedWidgetEditorProps) {
  const ct = useFixedT(fixedT);
  const [adding, setAdding] = useState(false);

  const { isMultiChildren, items, breadcrumbs, onNodeActive } =
    Hooks.useStructure(widget as Appcraft.NodeWidget);

  const [
    selected,
    { onWidgetAdd, onWidgetModify, onWidgetRemove, onWidgetSelect },
  ] = Hooks.useWidgetMutation(
    widget as Appcraft.NodeWidget,
    isMultiChildren,
    breadcrumbs[breadcrumbs.length - 1]?.paths,
    onWidgetChange
  );

  const LazyWidgetNodes = Hooks.useLazyWidgetNodes<
    Appcraft.WidgetStructure,
    Types.LazyWidgetNodesProps<typeof onNodeActive>
  >(fetchOptions.nodes, items, ({ fetchData, widgets, onActive, ...props }) => (
    <>
      {widgets.map((item, index) => (
        <WidgetNode
          {...props}
          key={`item_${index}`}
          item={item}
          structure={item.category === 'node' && fetchData?.[item.typeName]}
          onActive={(type, propPath) => {
            if (item.category === 'node') {
              onActive({
                type: item.type,
                isMultiChildren: type === 'node',
                propPath,
                index,
              });
            }
          }}
        />
      ))}
    </>
  ));

  return (
    <>
      <WidgetAddDialog
        {...{ renderWidgetTypeSelection }}
        open={adding}
        onClose={() => setAdding(false)}
        onConfirm={onWidgetAdd}
      />

      {selected && (
        <CraftedTypeEditor
          disableSelection={disableSelection}
          fixedT={fixedT}
          open={Boolean(selected)}
          parser={fetchOptions.parser}
          values={selected}
          onChange={onWidgetModify}
          action={
            <WidgetAppBar
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

                <Breadcrumbs separator="›" style={{ marginRight: 'auto' }}>
                  {breadcrumbs.map(({ type, tooltip }, i, arr) => (
                    <Tooltip key={`breadcrumb_${i}`} title={tooltip}>
                      <Styles.Breadcrumb
                        brcVariant={i === arr.length - 1 ? 'text' : 'link'}
                        onClick={() => onNodeActive(i + 1)}
                      >
                        {type}
                      </Styles.Breadcrumb>
                    </Tooltip>
                  ))}
                </Breadcrumbs>

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
                onClick={(e) => {
                  if (e.category === 'node') {
                    onWidgetSelect(e);
                  }
                }}
                onRemove={onWidgetRemove}
                onActive={onNodeActive}
              />
            </Suspense>
          )}
        </List>
      </Collapse>
    </>
  );
}
