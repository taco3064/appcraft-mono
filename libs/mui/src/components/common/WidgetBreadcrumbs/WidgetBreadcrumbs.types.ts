import type { Breadcrumbs } from '../../../hooks';
import type { FixedT, PropPaths } from '../../../contexts';

export interface WidgetBreadcrumbsProps {
  addable: boolean;
  breadcrumbs: Breadcrumbs;
  fixedT?: FixedT;
  onAdd: () => void;
  onRedirect: (paths: PropPaths) => void;
}
