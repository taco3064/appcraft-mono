import * as Dnd from '@dnd-kit/core';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import ImageList from '@mui/material/ImageList';
import Slide from '@mui/material/Slide';
import Toolbar from '@mui/material/Toolbar';
import WebTwoToneIcon from '@mui/icons-material/WebTwoTone';
import _get from 'lodash/get';
import _set from 'lodash/set';
import _toPath from 'lodash/toPath';
import { CraftsmanStyle } from '@appcraft/craftsman';
import { nanoid } from 'nanoid';
import { useMemo, useState } from 'react';

import { CommonButton, HierarchyItem } from '~appcraft/components/common';
import { useFixedT, useNodePicker, useWidth } from '~appcraft/hooks/common';
import type * as Types from './PageList.types';

export default function PageList({
  values,
  onChange,
  onActionNodePick,
}: Types.PageListProps) {
  const width = useWidth();
  const [at, wt] = useFixedT('app', 'websites');
  const [direction, setDirection] = useState<'left' | 'right'>('left');
  const [hierarchies, setHierarchies] = useState<Types.PageHierarchy[]>([]);

  const { items, paths, refresh } = useMemo(() => {
    const paths = !hierarchies.length
      ? []
      : _toPath(
          hierarchies.map(({ index }) => `[${index}]`).join('.routes')
        ).concat('.routes');

    return {
      paths,
      refresh: nanoid(4),
      items: ((!paths.length ? values : _get(values, paths)) ||
        []) as Types.Page[],
    };
  }, [values, hierarchies]);

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
          onClick={() => {
            setDirection('right');
            setHierarchies(hierarchies.slice(0, -1));
          }}
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
            onClick: () => {
              setDirection('right');
              setHierarchies([]);
            },
          }}
        >
          {hierarchies.map(({ id, subTitle }, i) => (
            <CraftsmanStyle.Breadcrumb
              key={id}
              brcVariant={i === hierarchies.length - 1 ? 'text' : 'link'}
              onClick={() => {
                setDirection('right');
                setHierarchies(hierarchies.slice(0, i + 1));
              }}
            >
              {subTitle}
            </CraftsmanStyle.Breadcrumb>
          ))}
        </CraftsmanStyle.Breadcrumbs>

        {actionNode}
      </Toolbar>

      <Slide key={refresh} direction={direction} in mountOnEnter unmountOnExit>
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

                  setDirection('left');
                  setHierarchies([...hierarchies]);
                }}
              />
            ))}
          </Dnd.DndContext>
        </ImageList>
      </Slide>
    </>
  );
}
