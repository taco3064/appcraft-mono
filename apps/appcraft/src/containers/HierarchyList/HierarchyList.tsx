import FilterListIcon from '@mui/icons-material/FilterList';
import IconButton from '@mui/material/IconButton';
import Masonry from '@mui/lab/Masonry';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import * as Component from '~appcraft/components';
import { searchHierarchy } from '~appcraft/services';
import { useFixedT } from '~appcraft/hooks';
import type * as Types from './HierarchyList.types';
import type { SearchParams } from '~appcraft/services';

const DEFAULT_ACTION_NODE_SPLIT: Types.HierarchyListProps['onActionNodeSplit'] =
  (e) => e;

export default function HierarchyList({
  category,
  icon,
  onActionNodeSplit = DEFAULT_ACTION_NODE_SPLIT,
}: Types.HierarchyListProps) {
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
            IconProps={{ fontSize: 'large' }}
            mode="add"
            data={{ category, type: 'group' }}
            onConfirm={() => refetch()}
          />
        ),
        addItem: (
          <Component.HierarchyEditorButton
            mode="add"
            data={{ category, type: 'item' }}
            onConfirm={() => refetch()}
          />
        ),
        search: !collapsed ? null : (
          <Tooltip title={at('btn-filter')}>
            <IconButton onClick={() => setCollapsed(false)}>
              <FilterListIcon fontSize="large" />
            </IconButton>
          </Tooltip>
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

      <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={2}>
        {hierarchies.map((data, i) => (
          <Paper key={data._id} elevation={0}>
            <Component.HierarchyCard
              data={data}
              icon={icon}
              onClick={console.log}
              onDataModify={() => refetch()}
            />
          </Paper>
        ))}
      </Masonry>
    </>
  );
}
