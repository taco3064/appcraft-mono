import AddIcon from '@mui/icons-material/Add';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Collapse from '@mui/material/Collapse';
import LinearProgress from '@mui/material/LinearProgress';
import List from '@mui/material/List';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import _set from 'lodash.set';
import { Suspense, useState } from 'react';
import type * as Appcraft from '@appcraft/types';

import { BreadcrumbLink, IconTipButton, ListToolbar } from '../../styles';
import { ListPlaceholder } from '../common';
import { WidgetAddDialog } from '../WidgetAddDialog';
import { WidgetNode } from '../WidgetNode';
import { useFixedT } from '../../contexts';
import * as Hooks from '../../hooks';
import type { ActionElement } from '../CraftedTypeEditor';
import type * as Types from './WidgetStructure.types';

export default function WidgetStructure<A extends ActionElement = undefined>({
  action,
  fetchOptions,
  fixedT,
  renderWidgetEditor,
  renderWidgetTypeSelection,
  widget,
  onWidgetChange,
}: Types.WidgetStructureProps<A>) {
  const ct = useFixedT(fixedT);
  const [building, setBuilding] = useState(false);
  const [selected, setSelected] = useState<Appcraft.NodeWidget | null>(null);

  const { isMultiChildren, items, breadcrumbs, onNodeActive } =
    Hooks.useStructure(widget as Appcraft.NodeWidget);

  const { onWidgetAdd, onWidgetRemove } = Hooks.useWidgetMutation(
    widget as Appcraft.NodeWidget,
    isMultiChildren,
    breadcrumbs[breadcrumbs.length - 1]?.paths,
    onWidgetChange
  );

  const LazyWidgetNodes = Hooks.useLazyWidgetNodes<
    Appcraft.WidgetStructure,
    Types.LazyWidgetNodesProps
  >(fetchOptions, items, ({ fetchData, widgets, onSelect, ...props }) => (
    <>
      {widgets.map((item, index) => (
        <WidgetNode
          {...props}
          key={`item_${index}`}
          item={item}
          structure={item.category === 'node' && fetchData?.[item.typeName]}
          onSelect={(type, path) => onSelect({ item, type, index, path })}
        />
      ))}
    </>
  ));

  return (
    <>
      <WidgetAddDialog
        {...{ renderWidgetTypeSelection }}
        open={building}
        onClose={() => setBuilding(false)}
        onConfirm={onWidgetAdd}
      />

      <Collapse in={Boolean(!selected)}>
        {action}

        <List
          subheader={
            breadcrumbs.length > 0 && (
              <ListToolbar>
                <IconTipButton
                  title={ct('btn-back')}
                  onClick={() => onNodeActive(breadcrumbs.length - 1)}
                  sx={{ margin: (theme) => theme.spacing(1, 0) }}
                >
                  <ChevronLeftIcon />
                </IconTipButton>

                <Breadcrumbs separator="›" style={{ marginRight: 'auto' }}>
                  {breadcrumbs.map(({ type, tooltip }, i, arr) => (
                    <Tooltip key={`breadcrumb_${i}`} title={tooltip}>
                      {i === arr.length - 1 ? (
                        <Typography variant="subtitle1" color="secondary">
                          {type}
                        </Typography>
                      ) : (
                        <BreadcrumbLink
                          key={`breadcrumb_${i}`}
                          onClick={() => onNodeActive(i + 1)}
                        >
                          {type}
                        </BreadcrumbLink>
                      )}
                    </Tooltip>
                  ))}
                </Breadcrumbs>

                {(isMultiChildren || items.length < 1) && (
                  <IconTipButton
                    title={ct('btn-new-widget')}
                    size="small"
                    onClick={() => setBuilding(true)}
                  >
                    <AddIcon />
                  </IconTipButton>
                )}
              </ListToolbar>
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
                  onClick={() => setBuilding(true)}
                >
                  {ct('btn-new-widget')}
                </Button>
              }
            />
          ) : (
            //* Structure List
            <Suspense fallback={<LinearProgress />}>
              <LazyWidgetNodes
                fixedT={fixedT}
                onClick={(e) => {
                  if (e.category === 'node') {
                    setSelected(e);
                  }
                }}
                onRemove={onWidgetRemove}
                onSelect={(e) => {
                  if (e.item.category === 'node') {
                    onNodeActive({
                      type: e.item.type,
                      isMultiChildren: e.type === 'node',
                      propPath: e.path,
                      index: e.index,
                    });
                  }
                }}
              />
            </Suspense>
          )}
        </List>
      </Collapse>

      {selected &&
        renderWidgetEditor({
          selected,
          onBackToStructure: () => setSelected(null),
          onSelectedChange: (modified) => {
            if (!breadcrumbs.length) {
              onWidgetChange(modified);
            } else {
              const { paths } = breadcrumbs[breadcrumbs.length - 1];

              onWidgetChange({
                ..._set(
                  widget as Appcraft.NodeWidget,
                  paths,
                  !isMultiChildren
                    ? modified
                    : items.map((item) => (item !== selected ? item : modified))
                ),
              });
            }
          },
        })}
    </>
  );
}
