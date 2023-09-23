import _get from 'lodash/get';
import _set from 'lodash/set';
import { useMemo, useState } from 'react';

import type * as Types from './useNavValues.types';

export const useNavValues: Types.NavValuesHook = (values, onChange) => {
  const [hierarchies, setHierarchies] = useState<Types.NavHierarchy[]>([]);

  const paths = useMemo(
    () =>
      !hierarchies.length
        ? []
        : hierarchies.map(({ index }) => [index, 'routes']).flat(),
    [hierarchies]
  );

  const items = useMemo<Types.Navigation[]>(
    () => (!paths.length ? values : _get(values, paths)) || [],
    [values, paths]
  );

  return [
    {
      hierarchies,
      items,
      paths,
    },
    {
      //* For Breadcrumbs
      back: () => setHierarchies(hierarchies.slice(0, -1)),
      top: () => setHierarchies([]),

      active: (e) => {
        if (typeof e === 'number') {
          setHierarchies(hierarchies.slice(0, e + 1));
        } else {
          hierarchies.push(e);
          setHierarchies([...hierarchies]);
        }
      },

      //* For Mutation
      add: (nav) => {
        const list = [...items, nav];

        onChange([...(!paths.length ? list : _set(values, paths, list))]);
      },
      update: (nav, index) => {
        items.splice(index, 1, nav);
        onChange([...(!paths.length ? items : _set(values, paths, items))]);
      },
    },
  ];
};
