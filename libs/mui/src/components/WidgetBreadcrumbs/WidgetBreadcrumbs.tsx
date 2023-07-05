import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import * as Styles from '../../styles';
import { Breadcrumbs } from '../common/Breadcrumbs';
import type { WidgetBreadcrumbsProps } from './WidgetBreadcrumbs.types';

export default function WidgetBreadcrumbs({
  addable,
  breadcrumbs,
  ct,
  onAdd,
  onRedirect,
}: WidgetBreadcrumbsProps) {
  return !breadcrumbs.length ? null : (
    <Styles.ListToolbar>
      <Styles.IconTipButton
        title={ct('btn-back')}
        onClick={() =>
          onRedirect(breadcrumbs[breadcrumbs.length - 2]?.paths || [])
        }
      >
        <ArrowBackIcon />
      </Styles.IconTipButton>

      <Breadcrumbs separator="›" maxItems={2} style={{ marginRight: 'auto' }}>
        {breadcrumbs.map(({ text, paths }, i, arr) => (
          <Styles.Breadcrumb
            key={`breadcrumb_${i}`}
            brcVariant={i === arr.length - 1 ? 'text' : 'link'}
            onClick={() => onRedirect(paths)}
          >
            {text}
          </Styles.Breadcrumb>
        ))}
      </Breadcrumbs>

      {addable && (
        <Styles.IconTipButton
          title={ct('btn-new-widget')}
          size="small"
          onClick={onAdd}
        >
          <AddIcon />
        </Styles.IconTipButton>
      )}
    </Styles.ListToolbar>
  );
}
