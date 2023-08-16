import type { Breadcrumbs } from '../../hooks';
import type { PropPaths } from '../../utils';

export interface WidgetBreadcrumbsProps {
  addable: boolean;
  breadcrumbs: Breadcrumbs;
  onAdd: () => void;
  onRedirect: (paths: PropPaths) => void;
}
