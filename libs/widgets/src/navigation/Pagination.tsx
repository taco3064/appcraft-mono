import Pagination from '@mui/material/Pagination';
import type { ComponentProps } from 'react';

export { Pagination };

export type PaginationProps = Pick<
  ComponentProps<typeof Pagination>,
  | 'boundaryCount'
  | 'color'
  | 'count'
  | 'defaultPage'
  | 'disabled'
  | 'hideNextButton'
  | 'hidePrevButton'
  | 'onChange'
  | 'page'
  | 'shape'
  | 'showFirstButton'
  | 'showLastButton'
  | 'siblingCount'
  | 'size'
  | 'variant'
>;
