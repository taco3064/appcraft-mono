import * as Dnd from '@dnd-kit/core';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Grow from '@mui/material/Grow';
import IconButton from '@mui/material/IconButton';
import ImageList from '@mui/material/ImageList';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import WebTwoToneIcon from '@mui/icons-material/WebTwoTone';
import { CraftsmanStyle } from '@appcraft/craftsman';
import { nanoid } from 'nanoid';
import { useMemo } from 'react';

import * as Hook from '~appcraft/hooks';
import ArborCard from '../ArborCard';
import NavMutationButton from '../NavMutationButton';
import NavMutationMenu from '../NavMutationMenu';
import type * as Types from './NavList.types';

export default function NavList({
  pageOptions,
  values,
  onChange,
  onActionNodePick = (e) => e,
}: Types.NavListProps) {
  const width = Hook.useWidth();
  const [at, wt] = Hook.useFixedT('app', 'websites');

  const [{ hierarchies, items, paths }, navHandles] = Hook.useNavValues(
    values,
    onChange
  );

  const refresh = useMemo(() => nanoid(hierarchies.length + 1), [hierarchies]);

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
  const actionNode = Hook.useNodePicker(
    (unmount) =>
      onActionNodePick({
        add: unmount ? null : (
          <NavMutationButton
            mode="add"
            data={{ isNavItem: false }}
            options={pageOptions}
            onConfirm={navHandles.add}
          />
        ),
      }),
    [items, paths]
  );

  return (
    <>
      <Toolbar
        disableGutters
        variant="dense"
        sx={(theme) => ({
          [theme.breakpoints.only('xs')]: {
            display: 'flex',
            flexDirection: 'column-reverse',
          },
        })}
      >
        <Toolbar disableGutters variant="dense" style={{ width: '100%' }}>
          <IconButton disabled={!hierarchies.length} onClick={navHandles.back}>
            <ArrowBackIcon />
          </IconButton>

          <CraftsmanStyle.Breadcrumbs
            className="breadcrumbs"
            collapsedTitle={wt('ttl-page-breadcrumbs')}
            separator="/"
            maxItems={3}
            style={{ marginRight: 'auto' }}
            TopProps={{
              alwaysShow: true,
              text: wt('txt-page-breadcrumb-top'),
              onClick: navHandles.top,
            }}
          >
            {hierarchies.map(({ id, subTitle }, i) => (
              <CraftsmanStyle.Breadcrumb
                key={id}
                brcVariant={i === hierarchies.length - 1 ? 'text' : 'link'}
                onClick={() => navHandles.active(i)}
              >
                {subTitle}
              </CraftsmanStyle.Breadcrumb>
            ))}
          </CraftsmanStyle.Breadcrumbs>

          {actionNode}
        </Toolbar>

        <Typography
          variant={width === 'xs' ? 'subtitle1' : 'h6'}
          fontWeight={600}
          color="secondary"
          whiteSpace="nowrap"
        >
          {wt('ttl-mode-page')}
        </Typography>
      </Toolbar>

      <Grow key={refresh} in>
        <ImageList
          gap={24}
          cols={width === 'xs' ? 1 : width === 'sm' ? 2 : 3}
          style={{ overflow: 'hidden auto' }}
        >
          <Dnd.DndContext
            sensors={sensors}
            onDragEnd={({ active, over }) => console.log(active, over)}
          >
            {items.map((page, i) => {
              const { id, subTitle, pathname, isNavItem } = page;

              return (
                <ArborCard
                  key={id}
                  icon={WebTwoToneIcon}
                  onClick={() => navHandles.active({ id, subTitle, index: i })}
                  data={{
                    _id: id,
                    category: 'route',
                    type: 'item',
                    name: subTitle,
                    description: pathname,
                  }}
                  mutation={
                    <NavMutationMenu
                      data={page}
                      onChange={(e) => navHandles.update(e, i)}
                    />
                  }
                />
              );
            })}
          </Dnd.DndContext>
        </ImageList>
      </Grow>
    </>
  );
}
