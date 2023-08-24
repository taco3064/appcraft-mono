import _pick from 'lodash/pick';
import { useMemo } from 'react';
import type { Breakpoint } from '@mui/material/styles';
import type { Layouts } from 'react-grid-layout';

import type * as Types from './useGridLayouts.types';

const getPrevLayout: Types.GetPrevLayout = ({
  id,
  breakpoint,
  breakpoints,
  cols,
  mins,
  layouts,
}) => {
  const prev = breakpoints[breakpoints.indexOf(breakpoint) - 1];
  const { [prev]: list = [] } = layouts;
  const layout = list.find(({ i }) => i === id);

  if (!layout) {
    return {
      i: id,
      minW: mins[breakpoint],
      w: mins[breakpoint],
      h: 1,
      x: 0,
      y: Math.max(...(layouts[breakpoint]?.map(({ y, h }) => y + h) || []), 0),
    };
  }

  return {
    i: id,
    minW: mins[breakpoint],
    y: layout.y,
    h: layout.h,
    w: Math.max(
      mins[breakpoint],
      Math.floor(
        (layout.w / (cols[prev] / cols.xs)) * (cols[breakpoint] / cols.xs)
      )
    ),
    x: Math.floor(
      (layout.x / (cols[prev] / cols.xs)) * (cols[breakpoint] / cols.xs)
    ),
  };
};

export const useGridLayouts: Types.GridLayoutsHook = (
  options,
  gridLayoutProps
) => {
  const stringify = JSON.stringify({
    props: _pick(gridLayoutProps, ['breakpoints', 'cols', 'mins']) || {},
    widgets: (Array.isArray(options) ? options : []).map(({ id, layout }) => ({
      id,
      layout,
    })),
  });

  return useMemo(() => {
    const { props, widgets }: Types.Config = JSON.parse(stringify);
    const keys = Object.keys(props.breakpoints || {}).reverse() as Breakpoint[];

    return widgets.reduce<Layouts>((result, { id, layout }) => {
      keys.forEach((breakpoint) => {
        const opts = layout[breakpoint];
        const { [breakpoint]: acc = [] } = result;

        result[breakpoint] = [
          ...acc,
          opts
            ? { i: id, ...opts }
            : getPrevLayout({
                ...props,
                id,
                breakpoint,
                breakpoints: keys,
                layouts: result,
              }),
        ];
      });

      return result;
    }, {});
  }, [stringify]);
};
