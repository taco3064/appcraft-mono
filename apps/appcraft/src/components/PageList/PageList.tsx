import * as Dnd from '@dnd-kit/core';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Grow from '@mui/material/Grow';
import IconButton from '@mui/material/IconButton';
import ImageList from '@mui/material/ImageList';
import Toolbar from '@mui/material/Toolbar';
import WebTwoToneIcon from '@mui/icons-material/WebTwoTone';
import _get from 'lodash/get';
import _set from 'lodash/set';
import { CraftsmanStyle } from '@appcraft/craftsman';
import { nanoid } from 'nanoid';
import { useMemo, useState } from 'react';

import CommonButton from '../CommonButton';
import HierarchyItem from '../HierarchyItem';
import { useFixedT, useNodePicker, useWidth } from '~appcraft/hooks';
import type * as Types from './PageList.types';

export default function PageList({
  values,
  onChange,
  onActionNodePick,
}: Types.PageListProps) {
  const width = useWidth();
  const [at, wt] = useFixedT('app', 'websites');
  const [hierarchies, setHierarchies] = useState<Types.PageHierarchy[]>([]);

  const { paths, refresh } = useMemo(
    () => ({
      refresh: nanoid(4),
      paths: !hierarchies.length
        ? []
        : hierarchies.map(({ index }) => [index, 'routes']).flat(),
    }),
    [hierarchies]
  );

  const items = useMemo<Types.Page[]>(
    () => (!paths.length ? values : _get(values, paths)) || [],
    [values, paths]
  );

  //* Dnd
  const sensors = Dnd.useSensors(
    Dnd.useSensor(Dnd.MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    Dnd.useSensor(Dnd.TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  //* Action Node
  const actionNode = useNodePicker(
    () =>
      onActionNodePick({
        add: (
          <CommonButton
            btnVariant="icon"
            icon={<AddIcon />}
            text={at('btn-add')}
            onClick={() => {
              items.push({
                id: nanoid(4),
                subTitle: '',
                pathname: '',
                isNavItem: false,
              });

              onChange([..._set(values, paths, [...items])]);
            }}
          />
        ),
      }),
    [items, paths]
  );

  return (
    <>
      <Toolbar disableGutters variant="dense">
        <IconButton
          disabled={!hierarchies.length}
          onClick={() => setHierarchies(hierarchies.slice(0, -1))}
        >
          <ArrowBackIcon />
        </IconButton>

        <CraftsmanStyle.Breadcrumbs
          collapsedTitle={wt('ttl-page-breadcrumbs')}
          separator="/"
          maxItems={4}
          style={{ marginRight: 'auto' }}
          TopProps={{
            alwaysShow: true,
            text: wt('txt-page-breadcrumb-top'),
            onClick: () => setHierarchies([]),
          }}
        >
          {hierarchies.map(({ id, subTitle }, i) => (
            <CraftsmanStyle.Breadcrumb
              key={id}
              brcVariant={i === hierarchies.length - 1 ? 'text' : 'link'}
              onClick={() => setHierarchies(hierarchies.slice(0, i + 1))}
            >
              {subTitle}
            </CraftsmanStyle.Breadcrumb>
          ))}
        </CraftsmanStyle.Breadcrumbs>

        {actionNode}
      </Toolbar>

      <Grow key={refresh} in>
        <ImageList
          gap={24}
          cols={width === 'xs' ? 1 : /^(sm|lg)$/.test(width) ? 2 : 3}
          style={{ overflow: 'hidden auto' }}
        >
          <Dnd.DndContext
            sensors={sensors}
            onDragEnd={({ active, over }) => console.log(active, over)}
          >
            {items.map(({ id, subTitle, pathname, isNavItem }, i) => (
              <HierarchyItem
                key={id}
                icon={WebTwoToneIcon}
                data={{
                  _id: id,
                  category: 'route',
                  type: 'item',
                  name: subTitle,
                  description: pathname,
                }}
                onClick={() => {
                  hierarchies.push({ id, subTitle, index: i });
                  setHierarchies([...hierarchies]);
                }}
              />
            ))}
          </Dnd.DndContext>
        </ImageList>
      </Grow>
    </>
  );
}