import AddIcon from '@mui/icons-material/Add';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Collapse from '@mui/material/Collapse';
import LinearProgress from '@mui/material/LinearProgress';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import _set from 'lodash.set';
import axios from 'axios';
import { Suspense, lazy, useMemo, useState } from 'react';
import type { NodeWidget, WidgetOptions } from '@appcraft/types';

import { IconTipButton, ListToolbar } from '../../styles';
import { ListPlaceholder } from '../common';
import { WidgetAddDialog } from '../WidgetAddDialog';
import { WidgetStructureItem } from '../WidgetStructureItem';
import { useFixedT } from '../../contexts';
import { useStructure } from '../../hooks';
import type { ActionElement } from '../CraftedTypeEditor';
import type * as Types from './WidgetStructure.types';

export default function WidgetStructure<A extends ActionElement = undefined>({
  action,
  fixedT,
  nodes,
  open = true,
  renderWidgetTypeSelection,
  widget,
  onWidgetChange,
  onWidgetSelect,
}: Types.WidgetStructureProps<A>) {
  const ct = useFixedT(fixedT);
  const [building, setBuilding] = useState(false);

  const { isMultiChildren, items, breadcrumbs, onNodeActive } = useStructure(
    widget as NodeWidget
  );

  const LazyStructureItems = useMemo(
    () =>
      lazy(async () => {
        const targets = items.reduce<Types.ParseOptions[]>((result, item) => {
          const { typeFile = null, typeName = null } =
            item.category === 'node' ? item : {};

          if (typeFile && typeName) {
            result.push({ typeFile, typeName });
          }

          return result;
        }, []);

        const { data } =
          (targets.length && (await axios({ ...nodes, data: targets }))) || {};

        return {
          default: ({ onSelect, ...props }) => (
            <>
              {items.map((item, index) => (
                <WidgetStructureItem
                  {...props}
                  key={`node_${index}`}
                  item={item}
                  structure={item.category === 'node' && data?.[item.typeName]}
                  onSelect={(type, path) =>
                    onSelect({ item, type, index, path })
                  }
                />
              ))}
            </>
          ),
        };
      }),
    [nodes, items]
  );

  return (
    <>
      <WidgetAddDialog
        {...{ renderWidgetTypeSelection }}
        open={building}
        onClose={() => setBuilding(false)}
        onConfirm={(e) => {
          if (!breadcrumbs.length) {
            onWidgetChange({ ...widget, ...e, category: 'node' } as NodeWidget);
          } else {
            const { paths } = breadcrumbs[breadcrumbs.length - 1];

            onWidgetChange({
              ..._set(
                widget as NodeWidget,
                paths,
                isMultiChildren
                  ? [...items, { ...e, category: 'node' }]
                  : { ...e, category: 'node' }
              ),
            });
          }
        }}
      />

      <Collapse in={open}>
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
                        <Link
                          key={`breadcrumb_${i}`}
                          component="button"
                          underline="hover"
                          variant="subtitle1"
                          color="text.primary"
                          onClick={() => onNodeActive(i + 1)}
                        >
                          {type}
                        </Link>
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
              <LazyStructureItems
                fixedT={fixedT}
                onClick={(e: WidgetOptions) => {
                  if (e.category === 'node') {
                    onWidgetSelect(e);
                  }
                }}
                onRemove={(e: WidgetOptions) => {
                  if (e === widget) {
                    onWidgetChange();
                  } else {
                    const { paths } = breadcrumbs[breadcrumbs.length - 1];

                    onWidgetChange({
                      ..._set(
                        widget as NodeWidget,
                        paths,
                        !isMultiChildren
                          ? undefined
                          : items.filter((item) => item !== e)
                      ),
                    });
                  }
                }}
                onSelect={(e: Types.NodeSelectEvent) => {
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
    </>
  );
}
