import Fade from '@mui/material/Fade';
import FilterListIcon from '@mui/icons-material/FilterList';
import ImageList from '@mui/material/ImageList';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';

import * as Component from '~appcraft/components';
import { Breadcrumbs } from '../Breadcrumbs';
import { CommonButton } from '~appcraft/components/common';
import { searchHierarchy } from '~appcraft/services';
import { useFixedT, useSuperiors, useWidth } from '~appcraft/hooks';
import type * as Types from './HierarchyList.types';

export default function HierarchyList({
  category,
  disableBreadcrumb = false,
  disableGroup = false,
  icon,
  onActionNodePick = (e) => e,
}: Types.HierarchyListProps) {
  const { pathname, push } = useRouter();
  const [{ data: names }, superiors] = useSuperiors(category);
  const superior = superiors[superiors.length - 1];
  const width = useWidth();

  const [at] = useFixedT('app');
  const [collapsed, setCollapsed] = useState(true);
  const [keyword, setKeyword] = useState<string>('');

  const { data: hierarchies, refetch } = useQuery({
    refetchOnWindowFocus: false,
    queryFn: searchHierarchy,
    queryKey: [category, { keyword, superior }],
  });

  const { data: action } = useQuery({
    suspense: false,
    queryKey: [collapsed, disableGroup, superior] as [boolean, boolean, string],
    queryFn: ({ queryKey: [collapsed, disableGroup, superior] }) =>
      onActionNodePick({
        addGroup: !disableGroup && (
          <Component.HierarchyEditorButton
            IconProps={{ color: 'warning', fontSize: 'large' }}
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
            IconProps={{ color: 'info', fontSize: 'large' }}
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
                IconProps={{ fontSize: 'large' }}
                btnVariant="icon"
                icon={FilterListIcon}
                text={at('btn-filter')}
                onClick={() => setCollapsed(false)}
              />
            </div>
          </Fade>
        ),
      }),
  });

  return (
    <>
      {!disableBreadcrumb && (
        <Breadcrumbs
          ToolbarProps={{ disableGutters: true }}
          onCustomize={(breadcrumbs) => [
            ...breadcrumbs,
            ...superiors.map((id, i) => ({
              text: names[id],
              url: {
                pathname,
                query: {
                  superiors: superiors.slice(0, i + 1),
                },
              },
            })),
          ]}
        />
      )}

      {Object.values(action || {}).some((node) => node) && (
        <Toolbar
          disableGutters
          variant="dense"
          style={{ justifyContent: 'flex-end' }}
        >
          {action.search}
          {action.addGroup}
          {action.addItem}
        </Toolbar>
      )}

      <Component.CollapseKeyword
        in={!collapsed}
        defaultValue={keyword}
        onCollapse={() => setCollapsed(true)}
        onConfirm={setKeyword}
      />

      {hierarchies.length === 0 ? (
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
              onDataModify={() => refetch()}
            />
          ))}
        </ImageList>
      )}
    </>
  );
}
