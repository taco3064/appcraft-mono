import type { Breakpoint } from '@mui/material/styles';
import type { Navigation } from '~appcraft/hooks';

export interface WebsiteRouteProps {
  basename: string;
  maxWidth: Breakpoint;
  options: Navigation;
  routes: Map<string, Navigation>;
  title: string;
}
