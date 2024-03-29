import * as Dnd from '@dnd-kit/core';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Checkbox from '@mui/material/Checkbox';
import Grow from '@mui/material/Grow';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import ImageList from '@mui/material/ImageList';
import NearMeDisabledOutlinedIcon from '@mui/icons-material/NearMeDisabledOutlined';
import NearMeIcon from '@mui/icons-material/NearMe';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import WebTwoToneIcon from '@mui/icons-material/WebTwoTone';
import { CraftsmanStyle } from '@appcraft/craftsman';
import { nanoid } from 'nanoid';
import { useMemo } from 'react';
import { useWidth } from '@appcraft/exhibitor';

import * as Hook from '~appcraft/hooks';
import AnchorLinksButton from '../AnchorLinksButton';
import ArborCard from '../ArborCard';
import NavMutationButton from '../NavMutationButton';
import NavMutationMenu from '../NavMutationMenu';
import type * as Types from './NavList.types';

//* Components
export default function NavList({
  pageOptions,
  title,
  values,
  onChange,
  onActionNodePick = (e) => e,
}: Types.NavListProps) {
  const width = useWidth();
  const [wt] = Hook.useFixedT('websites');

  const [{ hierarchies, items, paths }, navHandles] = Hook.useNavValues(
    values,
    onChange
  );

  const refresh = useMemo(() => nanoid(hierarchies.length + 1), [hierarchies]);
  const pages = Hook.useNavOptions(values);

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

  //* Component Nodes
  const actionNode = Hook.useNodePicker(
    (unmount) =>
      onActionNodePick({
        add: unmount ? null : (
          <NavMutationButton
            mode="add"
            data={{ isNavItem: false }}
            options={pageOptions}
            onConfirm={(e) =>
              navHandles.mutate({ nav: { ...e, id: nanoid(6) } })
            }
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
          position: 'sticky',
          userSelect: 'none',
          top: 0,
          zIndex: theme.zIndex.appBar,
          background: theme.palette.background.default,

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

        {title}
      </Toolbar>

      <Grow key={refresh} in>
        <ImageList
          gap={24}
          cols={width === 'xs' ? 1 : width === 'sm' ? 2 : 3}
          style={{ overflow: 'hidden auto' }}
        >
          <Dnd.DndContext sensors={sensors} onDragEnd={navHandles.dnd}>
            {items.map((page, i) => {
              const { id, icon, pageid, subTitle, pathname, isNavItem } = page;

              return (
                <ArborCard
                  key={id}
                  enableItemDroppable
                  description={pathname}
                  icon={WebTwoToneIcon}
                  id={id}
                  type="item"
                  title={
                    <CraftsmanStyle.GapTypography variant="subtitle1">
                      {icon && <Icon>{icon}</Icon>}
                      {subTitle}
                    </CraftsmanStyle.GapTypography>
                  }
                  mutation={
                    <NavMutationMenu
                      data={page}
                      pageOptions={pageOptions}
                      onChange={(e) => navHandles.mutate({ nav: e, index: i })}
                      onRemove={() => navHandles.mutate({ index: i })}
                      {...(paths.length && {
                        onMoveToSuperior: () => navHandles.superior(page),
                      })}
                    />
                  }
                  onClick={() =>
                    navHandles.active({ id, subTitle, pathname, index: i })
                  }
                  onActionRender={() => (
                    <>
                      <AnchorLinksButton
                        id={{ nav: id, page: pageid }}
                        pages={pages}
                        value={page}
                        onConfirm={(e) =>
                          navHandles.mutate({
                            index: i,
                            nav: { ...page, links: e },
                          })
                        }
                      />

                      <Tooltip
                        title={wt(`msg-nav-item-${isNavItem ? 'on' : 'off'}`)}
                      >
                        <Checkbox
                          color="primary"
                          icon={<NearMeDisabledOutlinedIcon color="action" />}
                          checkedIcon={<NearMeIcon />}
                          checked={isNavItem}
                          onChange={(e) =>
                            navHandles.mutate({
                              index: i,
                              nav: { ...page, isNavItem: e.target.checked },
                            })
                          }
                        />
                      </Tooltip>
                    </>
                  )}
                />
              );
            })}
          </Dnd.DndContext>
        </ImageList>
      </Grow>
    </>
  );
}
