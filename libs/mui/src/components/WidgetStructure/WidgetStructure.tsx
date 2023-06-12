import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import LinearProgress from '@mui/material/LinearProgress';
import List from '@mui/material/List';
import axios from 'axios';
import { Suspense, lazy, useMemo, useState } from 'react';
import type { NodeWidget, WidgetOptions } from '@appcraft/types';

import { NoWidgetItem } from '../common';
import { WidgetAddDialog } from '../WidgetAddDialog';
import { WidgetStructureItem } from '../WidgetStructureItem';
import { useFixedT } from '../../contexts';
import { useStructurePath } from '../../hooks';
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

  const { items, paths, onPathsChange } = useStructurePath(
    widget as NodeWidget
  );

  const LazyStructureItems = useMemo(
    () =>
      lazy(async () => {
        const targets = items.reduce<Types.ParseOptions[]>((result, item) => {
          if (item.category === 'node' && item.typeName && item.typeFile) {
            result.push({
              typeFile: item.typeFile,
              typeName: item.typeName,
            });
          }

          return result;
        }, []);

        const isValid = Boolean(targets.length);

        const { data } = !isValid
          ? { data: null }
          : await axios({
              ...nodes,
              data: targets,
            });

        return {
          default: ({ onStructureSelect, ...props }) => (
            <>
              {items.map((item, index) => (
                <WidgetStructureItem
                  {...props}
                  key={`node_${index}`}
                  item={item}
                  structure={item.category === 'node' && data?.[item.typeName]}
                  onStructureSelect={(path) => onStructureSelect(index, path)}
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
        {action && (
          <>
            {action}
            <Divider />
          </>
        )}

        <List>
          {!widget ? (
            <NoWidgetItem fixedT={fixedT} onAdd={() => setBuilding(true)} />
          ) : (
            <Suspense fallback={<LinearProgress />}>
              <LazyStructureItems
                fixedT={fixedT}
                onRemoved={(e: WidgetOptions) => console.log(e)}
                onClick={(e: WidgetOptions) => {
                  if (e.category === 'node') {
                    onWidgetSelect(e);
                  }
                }}
                onStructureSelect={(index: number, path: string) =>
                  console.log(index, path)
                }
              />
            </Suspense>
          )}
        </List>
      </Collapse>
    </>
  );
}
