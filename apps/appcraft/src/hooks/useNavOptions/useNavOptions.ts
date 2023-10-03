import { useMemo } from 'react';
import type { GetNavOptionsFn, NavOptionsHook } from './useNavOptions.types';

//* Methods
const getNavOptions: GetNavOptionsFn = (hierarchies, items) => {
  const base = hierarchies.map(({ pathname }) => pathname).join('');

  return items.reduce(
    (result, { id, pageid, subTitle, pathname, routes }, index) => {
      result.push(
        {
          value: { nav: id, page: pageid },
          primary: subTitle,
          secondary: `${base}${pathname}`,
        },
        ...(!Array.isArray(routes)
          ? []
          : getNavOptions(
              [...hierarchies, { id, index, subTitle, pathname }],
              routes
            ))
      );

      return result;
    },
    []
  );
};

//* Custom Hooks
export const useNavOptions: NavOptionsHook = (pages) =>
  useMemo(() => getNavOptions([], pages), [pages]);
