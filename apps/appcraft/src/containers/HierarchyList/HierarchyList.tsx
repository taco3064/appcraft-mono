import FilterListIcon from '@mui/icons-material/FilterList';
import ImageList from '@mui/material/ImageList';
import Toolbar from '@mui/material/Toolbar';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import * as Component from '~appcraft/components';
import { CommonButton } from '~appcraft/components/common';
import { searchHierarchy } from '~appcraft/services';
import { useFixedT, useWidth } from '~appcraft/hooks';
import type * as Types from './HierarchyList.types';
import type { SearchParams } from '~appcraft/services';

const DEFAULT_ACTION_NODE_SPLIT: Types.HierarchyListProps['onActionNodeSplit'] =
  (e) => e;

export default function HierarchyList({
  category,
  icon,
  onActionNodeSplit = DEFAULT_ACTION_NODE_SPLIT,
}: Types.HierarchyListProps) {
  const width = useWidth();
  const [at] = useFixedT('app');
  const [collapsed, setCollapsed] = useState(true);

  const [params, setParams] = useState<SearchParams>({
    keyword: '',
    superior: '',
  });

  const { data: hierarchies, refetch } = useQuery({
    queryKey: [category, params],
    queryFn: searchHierarchy,
    refetchOnWindowFocus: false,
  });

  const { data: action } = useQuery({
    suspense: false,
    queryKey: [collapsed],
    queryFn: ({ queryKey: [collapsed] }) =>
      onActionNodeSplit({
        addGroup: (
          <Component.HierarchyEditorButton
            IconProps={{ color: 'warning', fontSize: 'large' }}
            mode="add"
            data={{ category, type: 'group' }}
            onConfirm={() => refetch()}
          />
        ),
        addItem: (
          <Component.HierarchyEditorButton
            IconProps={{ color: 'info', fontSize: 'large' }}
            mode="add"
            data={{ category, type: 'item' }}
            onConfirm={() => refetch()}
          />
        ),
        search: !collapsed ? null : (
          <CommonButton
            IconProps={{ fontSize: 'large' }}
            btnVariant="icon"
            icon={FilterListIcon}
            text={at('btn-filter')}
            onClick={() => setCollapsed(false)}
          />
        ),
      }),
  });

  return (
    <>
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
        defaultValue={params.keyword}
        onCollapse={() => setCollapsed(true)}
        onConfirm={(keyword) => setParams({ ...params, keyword })}
      />

      <ImageList gap={24} cols={width === 'xs' ? 1 : width === 'sm' ? 2 : 3}>
        {hierarchies.map((data) => (
          <Component.HierarchyItem
            key={data._id}
            data={data}
            icon={icon}
            onClick={console.log}
            onDataModify={() => refetch()}
          />
        ))}
      </ImageList>
    </>
  );
}
