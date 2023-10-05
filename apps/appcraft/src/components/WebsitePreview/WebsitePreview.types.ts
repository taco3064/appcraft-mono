import type { Breakpoint } from '@mui/material/styles';
import type { Website } from '@appcraft/types';

import type { PageData } from '~appcraft/hooks';

export interface WebsitePreviewProps {
  breakpoint: Breakpoint;
  homepage?: PageData;
  options: Website;
  scale?: number;
  title?: string;
}
