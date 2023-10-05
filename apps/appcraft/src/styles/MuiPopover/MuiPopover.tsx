import Popover from '@mui/material/Popover';
import { useMemo } from 'react';
import { withStyles } from 'tss-react/mui';
import type { PaperProps } from '@mui/material/Paper';

import type * as Types from './MuiPopover.types';

export const ScaledPopover = withStyles(
  ({
    PaperProps,
    children,
    classes: { content: contentClassName, ...classes },
    scale = 1,
    ...props
  }: Types.ScaledPopoverProps) => {
    const resizeObserver = useMemo(
      () =>
        new ResizeObserver((entries) => {
          for (const entry of entries) {
            const svg = entry.target.closest('svg');
            const fobj = entry.target.closest('foreignObject');
            const { width, height } = entry.contentRect;

            svg.setAttribute('width', `${width * scale}px`);
            svg.setAttribute('height', `${height * scale}px`);
            fobj.setAttribute('width', `${100 / scale}%`);
            fobj.setAttribute('height', `${100 / scale}%`);
          }
        }),
      [scale]
    );

    return (
      <Popover
        {...props}
        classes={classes}
        PaperProps={{ ...PaperProps, component: 'svg' } as PaperProps}
      >
        <foreignObject width="100%" height="100%" transform={`scale(${scale})`}>
          <div
            ref={(el) => el && resizeObserver.observe(el)}
            className={contentClassName}
          >
            {children}
          </div>
        </foreignObject>
      </Popover>
    );
  },
  (theme) => ({
    content: {
      width: 'max-content',
      height: 'max-content',
    },
  }),
  { name: 'ScaledPopover' }
);
