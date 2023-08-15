import type { Breadcrumbs } from '../../hooks';
import type { FixedT } from '../../contexts';
import type { PropPaths } from '../../utils';

export interface WidgetBreadcrumbsProps {
  addable: boolean;
  breadcrumbs: Breadcrumbs;
  ct: FixedT;
  onAdd: () => void;
  onRedirect: (paths: PropPaths) => void;
}
