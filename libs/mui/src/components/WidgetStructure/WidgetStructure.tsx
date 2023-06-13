import AddIcon from '@mui/icons-material/Add';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Collapse from '@mui/material/Collapse';
import LinearProgress from '@mui/material/LinearProgress';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { Suspense, lazy, useMemo, useState } from 'react';
import type { NodeWidget, WidgetOptions } from '@appcraft/types';

import { IconTipButton, ListToolbar } from '../../styles';
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

  console.log(items, breadcrumbs);

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
          default: ({ onNodeSelect, ...props }) => (
            <>
              {items.map((item, index) => (
                <WidgetStructureItem
                  {...props}
                  key={`node_${index}`}
                  item={item}
                  structure={item.category === 'node' && data?.[item.typeName]}
                  onNodeSelect={(type, path) =>
                    onNodeSelect({ item, type, index, path })
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
        onConfirm={(e) =>
          onWidgetChange({ ...widget, ...e, category: 'node' } as NodeWidget)
        }
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
          {widget ? (
            //* Structure List
            <Suspense fallback={<LinearProgress />}>
              <LazyStructureItems
                fixedT={fixedT}
                onRemove={(e: WidgetOptions) => console.log(e)}
                onClick={(e: WidgetOptions) => {
                  if (e.category === 'node') {
                    onWidgetSelect(e);
                  }
                }}
                onNodeSelect={(e: Types.NodeSelectEvent) => {
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
          ) : (
            //* Empty List
            <ListItem>
              <ListItemText
                disableTypography
                primary={
                  <Typography
                    variant="h6"
                    color="text.secondary"
                    align="center"
                    sx={{ marginTop: (theme) => theme.spacing(2) }}
                  >
                    {ct('msg-no-widget')}
                  </Typography>
                }
                secondary={
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
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: (theme) => theme.spacing(3),
                }}
              />
            </ListItem>
          )}
        </List>
      </Collapse>
    </>
  );
}
