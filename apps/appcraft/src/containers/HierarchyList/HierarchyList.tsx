import Fade from '@mui/material/Fade';
import FilterListIcon from '@mui/icons-material/FilterList';
import ImageList from '@mui/material/ImageList';
import Typography from '@mui/material/Typography';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';

import * as Comp from '~appcraft/components';
import * as Hook from '~appcraft/hooks';
import { CommonButton } from '~appcraft/components/common';
import { searchHierarchy } from '~appcraft/services';
import type * as Types from './HierarchyList.types';

export default function HierarchyList({
  category,
  disableGroup = false,
  icon,
  onActionNodePick = (e) => e,
  onItemActionRender,
}: Types.HierarchyListProps) {
  const { breadcrumbs, keyword, superiors } = Hook.useHierarchyFilter(category);
  const { pathname, push } = useRouter();
  const superiorList = Object.keys(superiors);
  const superior = superiorList[superiorList.length - 1] || null;
  const width = Hook.useWidth();

  const [at] = Hook.useFixedT('app');
  const [collapsed, setCollapsed] = useState(Boolean(!keyword));

  const { data: hierarchies, refetch } = useQuery({
    refetchOnWindowFocus: false,
    queryFn: searchHierarchy,
    queryKey: [category, keyword ? { keyword } : { superior }],
  });

  const actionNode = Hook.useNodePicker(
    () =>
      onActionNodePick({
        addGroup: !disableGroup && (
          <Comp.HierarchyEditorButton
            mode="add"
            data={{
              category,
              type: 'group',
              ...(typeof superior === 'string' && { superior }),
            }}
            onConfirm={() => refetch()}
          />
        ),
        addItem: (
          <Comp.HierarchyEditorButton
            mode="add"
            data={{
              category,
              type: 'item',
              ...(typeof superior === 'string' && { superior }),
            }}
            onConfirm={() => refetch()}
          />
        ),
        search: (
          <Fade in={collapsed}>
            <div>
              <CommonButton
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

  return (
    <>
      <Comp.Breadcrumbs
        ToolbarProps={{ disableGutters: true }}
        onCustomize={($breadcrumbs) => [
          ...$breadcrumbs,
          ...(!keyword
            ? breadcrumbs
            : [{ text: `${at('btn-filter')}: ${keyword}` }]),
        ]}
        action={actionNode}
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
        <ImageList
          gap={24}
          cols={width === 'xs' ? 1 : width === 'sm' ? 2 : 3}
          style={{ overflow: 'hidden auto' }}
        >
          {hierarchies.map((data) => (
            <Comp.HierarchyItem
              key={data._id}
              data={data}
              icon={icon}
              onActionRender={onItemActionRender}
              onDataModify={() => refetch()}
              onClick={(data) =>
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
                )
              }
            />
          ))}
        </ImageList>
      )}
    </>
  );
}
