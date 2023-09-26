import * as Dnd from '@dnd-kit/core';
import Fade from '@mui/material/Fade';
import FilterListIcon from '@mui/icons-material/FilterList';
import Grow from '@mui/material/Grow';
import ImageList from '@mui/material/ImageList';
import Typography from '@mui/material/Typography';
import { nanoid } from 'nanoid';
import { useMutation } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useMemo, useState } from 'react';

import * as Comp from '~appcraft/components';
import * as Hook from '~appcraft/hooks';
import * as Svc from '~appcraft/services';
import Breadcrumbs from '../Breadcrumbs';
import HierarchyMutationButton from '../HierarchyMutationButton';
import HierarchyMutationMenu from '../HierarchyMutationMenu';
import type * as Types from './HierarchyList.types';
import type { HierarchyData } from '~appcraft/services';

export default function HierarchyList({
  category,
  disableGroup = false,
  icon,
  onActionNodePick = (e) => e,
  onItemActionRender,
}: Types.HierarchyListProps) {
  const { breadcrumbs, keyword, superiors } = Hook.useHierarchyFilter(category);
  const { pathname, push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const superiorList = Object.keys(superiors);
  const superior = superiorList[superiorList.length - 1] || null;
  const width = Hook.useWidth();

  const [at] = Hook.useFixedT('app');
  const [collapsed, setCollapsed] = useState(Boolean(!keyword));

  const { data: hierarchies, refetch } = useQuery({
    refetchOnWindowFocus: false,
    queryFn: Svc.searchHierarchy,
    queryKey: [category, keyword ? { keyword } : { superior }],
  });

  const { mutate: handleDnd } = useMutation({
    mutationFn: Svc.updateHierarchy,
    onSuccess: (modified) => {
      enqueueSnackbar(at('msg-succeed-dnd', modified), { variant: 'success' });
      refetch();
    },
  });

  const refresh = useMemo(
    () => nanoid(hierarchies.length ? 4 : 6),
    [hierarchies]
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

  //* Action Nodes
  const actionNode = Hook.useNodePicker(
    () =>
      onActionNodePick({
        addGroup: !disableGroup && (
          <HierarchyMutationButton
            mode="add"
            onConfirm={() => refetch()}
            data={{
              category,
              type: 'group',
              ...(typeof superior === 'string' && { superior }),
            }}
          />
        ),
        addItem: (
          <HierarchyMutationButton
            mode="add"
            onConfirm={() => refetch()}
            data={{
              category,
              type: 'item',
              ...(typeof superior === 'string' && { superior }),
            }}
          />
        ),
        search: (
          <Fade in={collapsed}>
            <div>
              <Comp.CommonButton
                btnVariant="icon"
                icon={<FilterListIcon />}
                text={at('btn-filter')}
                onClick={() => setCollapsed(false)}
              />
            </div>
          </Fade>
        ),
      }),
    [collapsed, disableGroup, superior]
  );

  //* Event Handlers
  const handleItemClick = (data: HierarchyData<string>) =>
    push(
      data.type === 'group'
        ? {
            pathname,
            query: {
              superiors: [...superiorList, data._id].join('-'),
            },
          }
        : {
            pathname: `${pathname}/detail`,
            query: {
              id: data._id,
              ...(superiorList.length && {
                superiors: superiorList.join('-'),
              }),
            },
          }
    );

  const handleGroupChange: Types.HandleGroupChange = ({
    item,
    group,
    isGroupRequired = false,
  }) => {
    if (item && (!isGroupRequired || group)) {
      handleDnd({
        ...item,
        superior: group || null,
      });
    }
  };

  return (
    <>
      <Breadcrumbs
        ToolbarProps={{ disableGutters: true }}
        action={actionNode}
        onCustomize={($breadcrumbs) => [
          ...$breadcrumbs,
          ...(!keyword
            ? breadcrumbs
            : [{ text: `${at('btn-filter')}: ${keyword}` }]),
        ]}
      />

      <Comp.CollapseKeyword
        key={keyword}
        in={!collapsed}
        defaultValue={keyword}
        onCollapse={() => setCollapsed(true)}
        onConfirm={(value) => push({ pathname, query: { keyword: value } })}
      />

      {!hierarchies?.length ? (
        <Typography
          variant="h5"
          color="text.secondary"
          justifyContent="center"
          sx={(theme) => ({
            opacity: theme.palette.action.disabledOpacity,
            margin: theme.spacing(6, 0),
          })}
        >
          {at('txt-no-data')}
        </Typography>
      ) : (
        <Grow key={refresh} in>
          <ImageList
            gap={24}
            cols={width === 'xs' ? 1 : width === 'sm' ? 2 : 3}
            style={{ overflow: 'hidden auto' }}
          >
            <Dnd.DndContext
              sensors={sensors}
              onDragEnd={({ active, over }) =>
                active &&
                over &&
                active.id !== over.id &&
                handleGroupChange({
                  item: hierarchies.find(({ _id }) => _id === active.id),
                  group: over.id as string,
                  isGroupRequired: true,
                })
              }
            >
              {hierarchies.map((data) => {
                const { _id: id, type, name, description } = data;

                return (
                  <Comp.ArborCard
                    {...{ id, icon, type, name, description }}
                    key={id}
                    onActionRender={() => onItemActionRender?.(data)}
                    onClick={() => handleItemClick(data)}
                    disableGroupChange={hierarchies.every(
                      ({ type }) => type === 'item'
                    )}
                    mutation={
                      <HierarchyMutationMenu
                        data={data}
                        onSuccess={() => refetch()}
                        {...(superior && {
                          onMoveToSuperiorGroup: () =>
                            handleGroupChange({
                              item: data,
                              group: superiorList[superiorList.length - 2],
                            }),
                        })}
                      />
                    }
                  />
                );
              })}
            </Dnd.DndContext>
          </ImageList>
        </Grow>
      )}
    </>
  );
}
