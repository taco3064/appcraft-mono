import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import type { ComponentProps } from 'react';
import type { SvgIconProps } from '@mui/material/SvgIcon';

export type GridLayoutResizeHandleProps = ComponentProps<
  typeof ArrowForwardIosIcon
> & { handleAxis?: string };

export type SquareLogoProps = Omit<SvgIconProps, 'component'>;
