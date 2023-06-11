import Fade from '@mui/material/Fade';
import FilterListIcon from '@mui/icons-material/FilterList';
import ImageList from '@mui/material/ImageList';
import Typography from '@mui/material/Typography';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';

import * as Component from '~appcraft/components';
import * as Hooks from '~appcraft/hooks';
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
  const { pathname, push } = useRouter();
  const { breadcrumbs, superiors } = Hooks.useSuperiors(category);
  const superior = superiors[superiors.length - 1] || null;
  const width = Hooks.useWidth();

  const [at] = Hooks.useFixedT('app');
  const [collapsed, setCollapsed] = useState(true);
  const [keyword, setKeyword] = useState<string>('');

  const { data: hierarchies, refetch } = useQuery({
    refetchOnWindowFocus: false,
    queryFn: searchHierarchy,
    queryKey: [category, { keyword, superior }],
  });

  const actionNode = Hooks.useNodePicker(
    () =>
      onActionNodePick({
        addGroup: !disableGroup && (
          <Component.HierarchyEditorButton
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
          <Component.HierarchyEditorButton
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
                icon={FilterListIcon}
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
      <Component.Breadcrumbs
        ToolbarProps={{ disableGutters: true }}
        onCustomize={($breadcrumbs) => [...$breadcrumbs, ...breadcrumbs]}
        action={actionNode}
      />

      <Component.CollapseKeyword
        in={!collapsed}
        defaultValue={keyword}
        onCollapse={() => setCollapsed(true)}
        onConfirm={setKeyword}
      />

      {!hierarchies?.length ? (
        <Typography
          variant="h5"
          color="text.secondary"
          align="center"
          sx={(theme) => ({
            opacity: theme.palette.action.disabledOpacity,
            margin: theme.spacing(6, 0),
          })}
        >
          {at('txt-no-data')}
        </Typography>
      ) : (
        <ImageList gap={24} cols={width === 'xs' ? 1 : width === 'sm' ? 2 : 3}>
          {hierarchies.map((data) => (
            <Component.HierarchyItem
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
                          superiors: [...superiors, data._id].join('-'),
                        },
                      }
                    : {
                        pathname: `${pathname}/detail`,
                        query: {
                          id: data._id,
                          ...(superiors.length && {
                            superiors: superiors.join('-'),
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
