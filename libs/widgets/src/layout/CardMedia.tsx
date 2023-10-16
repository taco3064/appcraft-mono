import MuiCardMedia from '@mui/material/CardMedia';
import type { ComponentProps } from 'react';

export interface CardMediaProps
  extends Pick<
    ComponentProps<typeof MuiCardMedia>,
    'children' | 'image' | 'src'
  > {
  height?: string;
}

export const CardMedia = ({ height, ...props }: CardMediaProps) => (
  <MuiCardMedia sx={{ height: height || 140 }} {...props} />
);
