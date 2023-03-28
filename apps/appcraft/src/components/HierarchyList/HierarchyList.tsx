import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import debounce from 'lodash.debounce';
import { useQuery } from '@tanstack/react-query';
import { useState, useTransition } from 'react';

import type * as Types from './HierarchyList.types';
import type { SearchParams } from '~appcraft/services';
import { CollapsedButton } from '../CollapsedButton';
import { HierarchyEditorButton } from '../HierarchyEditorButton';
import { searchHierarchy } from '~appcraft/services';
import { useFixedT } from '~appcraft/hooks';

const DEFAULT_ACTION_NODE_SPLIT: Types.HierarchyListProps['onActionNodeSplit'] =
  (e) => e;

export default function HierarchyList({
  category,
  onActionNodeSplit = DEFAULT_ACTION_NODE_SPLIT,
}: Types.HierarchyListProps) {
  const [at] = useFixedT('app');
  const [, startTransition] = useTransition();

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
    queryKey: [params],
    queryFn: ({ queryKey: [{ keyword, superior }] }) =>
      onActionNodeSplit({
        addGroup: (
          <HierarchyEditorButton
            mode="add"
            data={{ category, type: 'group' }}
            onConfirm={() => refetch()}
          />
        ),
        keywordSearch: (
          <CollapsedButton icon={<SearchIcon fontSize="large" />}>
            <TextField
              autoFocus
              variant="outlined"
              size="small"
              label={at('lbl-keyword')}
              defaultValue={keyword}
              onChange={debounce(
                (e) =>
                  startTransition(() =>
                    setParams({ superior, keyword: e.target.value })
                  ),
                800
              )}
            />
          </CollapsedButton>
        ),
      }),
  });

  return <>{params.keyword}</>;
}
