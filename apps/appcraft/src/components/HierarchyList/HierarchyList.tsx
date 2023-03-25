import { ReactNode, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import type * as Types from './HierarchyList.types';
import type { SearchParams } from '~appcraft/services';
import { HierarchyEditorButton } from '../HierarchyEditorButton';
import { searchHierarchy } from '~appcraft/services';

const DEFAULT_ACTION_NODE_SPLIT: Types.HierarchyListProps['onActionNodeSplit'] =
  (_name, node) => Promise.resolve(node);

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
    queryFn: async () => {
      const nodes: Types.HierarchyListAction = new Map([
        [
          'addGroup',
          <HierarchyEditorButton
            mode="add"
            data={{ category, type: 'group' }}
          />,
        ],
      ]);

      return new Map(
        await Promise.all(
          Array.from(nodes.entries()).map(([name, node]) =>
            onActionNodeSplit(name, node).then<
              [Types.HierarchyListActionName, ReactNode]
            >((res) => [name, res])
          )
        )
      );
    },
  });

  return <>{action.get('addGroup')}</>;
}
