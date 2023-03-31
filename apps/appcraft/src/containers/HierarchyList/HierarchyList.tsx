import FilterListIcon from '@mui/icons-material/FilterList';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useQuery } from '@tanstack/react-query';
import { useRef, useState } from 'react';

import { CollapseKeyword } from '~appcraft/components/CollapseKeyword';
import { HierarchyEditorButton } from '../HierarchyEditorButton';
import { searchHierarchy } from '~appcraft/services';
import { useFixedT, useWidth } from '~appcraft/hooks';
import type * as Types from './HierarchyList.types';
import type { SearchParams } from '~appcraft/services';

const DEFAULT_ACTION_NODE_SPLIT: Types.HierarchyListProps['onActionNodeSplit'] =
  (e) => e;

const SEARCH_WIDTH: Record<'xs' | 'sm', string> = {
  xs: '100%',
  sm: '80%',
};

export default function HierarchyList({
  category,
  onActionNodeSplit = DEFAULT_ACTION_NODE_SPLIT,
}: Types.HierarchyListProps) {
  const width = useWidth();
  const keywordRef = useRef<HTMLInputElement>(null);
  const [at] = useFixedT('app');
  const [collapsed, setCollapsed] = useState(true);

  const [params, setParams] = useState<SearchParams>({
    keyword: '',
    superior: '',
  });

  const { data: hierarchies, refetch } = useQuery({
    queryKey: [category, params],
    queryFn: searchHierarchy,
  });

  const { data: action } = useQuery({
    suspense: false,
    queryKey: [collapsed],
    queryFn: ({ queryKey: [collapsed] }) =>
      onActionNodeSplit({
        addGroup: (
          <HierarchyEditorButton
            mode="add"
            data={{ category, type: 'group' }}
            onConfirm={() => refetch()}
          />
        ),
        addItem: (
          <HierarchyEditorButton
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
      <CollapseKeyword
        in={!collapsed}
        defaultValue={params.keyword}
        onCollapse={() => setCollapsed(true)}
        onConfirm={(keyword) => setParams({ ...params, keyword })}
      />

      {params.keyword}
    </>
  );
}
