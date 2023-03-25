import { ReactNode, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import type * as Types from './HierarchyList.types';
import type { SearchParams } from '~appcraft/services';
import { HierarchyEditorButton } from '../HierarchyEditorButton';
import { searchHierarchy } from '~appcraft/services';

const DEFAULT_ACTION_NODE_SPLIT: Types.HierarchyListProps['onActionNodeSplit'] =
  (e) => e;

export default function HierarchyList({
  category,
  onActionNodeSplit = DEFAULT_ACTION_NODE_SPLIT,
}: Types.HierarchyListProps) {
  const [{ keyword, superior }, setParams] = useState<SearchParams>({
    keyword: '',
    superior: '',
  });

  const { data: hierarchies } = useQuery({
    queryKey: [category, keyword, superior],
    queryFn: searchHierarchy,
  });

  const { data: action } = useQuery({
    queryKey: [],
    queryFn: async () =>
      onActionNodeSplit({
        addGroup: (
          <HierarchyEditorButton
            mode="add"
            data={{ category, type: 'group' }}
          />
        ),
        addItem: null,
      }),
  });

  return <>{action.addGroup}</>;
}
