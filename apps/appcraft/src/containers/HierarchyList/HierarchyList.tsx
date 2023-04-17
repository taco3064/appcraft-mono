import Fade from '@mui/material/Fade';
import FilterListIcon from '@mui/icons-material/FilterList';
import ImageList from '@mui/material/ImageList';
import Toolbar from '@mui/material/Toolbar';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';

import * as Component from '~appcraft/components';
import { Breadcrumbs } from '../Breadcrumbs';
import { CommonButton } from '~appcraft/components/common';
import { getHierarchyNames, searchHierarchy } from '~appcraft/services';
import { useFixedT, useWidth } from '~appcraft/hooks';
import type * as Types from './HierarchyList.types';

const DEFAULT_ACTION_NODE_SPLIT: Types.HierarchyListProps['onActionNodeSplit'] =
  (e) => e;

export default function HierarchyList({
  category,
  disableBreadcrumb = false,
  icon,
  onActionNodeSplit = DEFAULT_ACTION_NODE_SPLIT,
}: Types.HierarchyListProps) {
  const { pathname, push, query } = useRouter();
  const superiors = (query.superiors as string)?.split('-') || [];
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

  const { data: names } = useQuery({
    refetchOnWindowFocus: false,
    queryFn: getHierarchyNames,
    queryKey: [category, superiors],
  });

  const { data: action } = useQuery({
    suspense: false,
    queryKey: [collapsed, superior] as [boolean, string],
    queryFn: ({ queryKey: [collapsed, superior] }) =>
      onActionNodeSplit({
        addGroup: (
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
          stretches={superiors.map((id, i) => ({
            text: names[id],
            url: {
              pathname,
              query: {
                superiors: superiors.slice(0, i + 1),
              },
            },
          }))}
        />
      )}

      {Object.keys(action || {}).length > 0 && (
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

      <ImageList gap={24} cols={width === 'xs' ? 1 : width === 'sm' ? 2 : 3}>
        {hierarchies.map((data) => (
          <Component.HierarchyItem
            key={data._id}
            data={data}
            icon={icon}
            onClick={(data) => {
              if (data.type === 'group') {
                push({
                  pathname,
                  query: {
                    superiors: [...superiors, data._id].join('-'),
                  },
                });
              }
            }}
            onDataModify={() => refetch()}
          />
        ))}
      </ImageList>
    </>
  );
}
