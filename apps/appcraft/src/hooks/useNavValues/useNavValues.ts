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
      dnd: ({ active, over }) => {
        if (active && over && active.id !== over.id) {
          const drag = items[active.id as number];
          const drop = items[over.id as number];

          items.splice(active.id as number, 1);
          drop.routes = [...(drop.routes || []), drag];

          onChange([...(!paths.length ? items : _set(values, paths, items))]);
        }
      },

      mutate: ({ index, nav }) => {
        if (typeof index !== 'number' && nav) {
          items.push(nav);
        } else if (typeof index === 'number' && !nav) {
          items.splice(index, 1);
        } else if (typeof index === 'number' && nav) {
          const { id } = items[index];

          items.splice(
            index,
            1,
            id === nav.id
              ? nav
              : {
                  ...nav,
                  links: undefined,
                }
          );
        }

        onChange([...(!paths.length ? items : _set(values, paths, items))]);
      },

      superior: (e) => {
        const index = items.findIndex(({ id }) => id === e.id);

        const paths = hierarchies
          .slice(0, -1)
          .map(({ index }) => [index, 'routes'])
          .flat();

        const superior = !paths.length ? values : _get(values, paths);

        items.splice(index, 1);
        superior.push(e);

        onChange([
          ...(!paths.length ? superior : _set(values, paths, superior)),
        ]);
      },
    },
  ];
};
