import * as Dnd from '@dnd-kit/core';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import ImageList from '@mui/material/ImageList';
import Toolbar from '@mui/material/Toolbar';
import { CraftsmanStyle } from '@appcraft/craftsman';
import { useState } from 'react';

import { useFixedT, useWidth } from '~appcraft/hooks/common';
import type * as Types from './PageList.types';

export default function PageList({
  values,
  onChange,
  onActionNodePick,
}: Types.PageListProps) {
  const width = useWidth();
  const [wt] = useFixedT('websites');
  const [hierarchies, setHierarchies] = useState<Types.PageHierarchy[]>([]);

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
      </Toolbar>

      <ImageList
        gap={24}
        cols={width === 'xs' ? 1 : width === 'sm' ? 2 : 3}
        style={{ overflow: 'hidden auto' }}
      >
        <Dnd.DndContext
          sensors={sensors}
          onDragEnd={({ active, over }) => console.log(active, over)}
        ></Dnd.DndContext>
      </ImageList>
    </>
  );
}
