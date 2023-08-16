import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import * as Style from '../../styles';
import { Breadcrumbs } from '../common';
import { useLocalesContext } from '../../contexts';
import type { WidgetBreadcrumbsProps } from './WidgetBreadcrumbs.types';

export default function WidgetBreadcrumbs({
  addable,
  breadcrumbs,
  onAdd,
  onRedirect,
}: WidgetBreadcrumbsProps) {
  const ct = useLocalesContext();

  return !breadcrumbs.length ? null : (
    <Style.ListToolbar>
      <Style.IconTipButton
        title={ct('btn-back')}
        onClick={() =>
          onRedirect(breadcrumbs[breadcrumbs.length - 2]?.paths || [])
        }
      >
        <ArrowBackIcon />
      </Style.IconTipButton>

      <Breadcrumbs
        TopProps={{ text: ct('txt-top'), onClick: () => onRedirect([]) }}
        collapsedTitle={ct('ttl-structure')}
        separator="›"
        maxItems={2}
        style={{ marginRight: 'auto' }}
      >
        {breadcrumbs.map(({ text, paths }, i, arr) => (
          <Style.Breadcrumb
            key={`breadcrumb_${i}`}
            brcVariant={i === arr.length - 1 ? 'text' : 'link'}
            onClick={() => onRedirect(paths)}
          >
            {text}
          </Style.Breadcrumb>
        ))}
      </Breadcrumbs>

      {addable && (
        <Style.IconTipButton title={ct('btn-new-widget')} onClick={onAdd}>
          <AddIcon />
        </Style.IconTipButton>
      )}
    </Style.ListToolbar>
  );
}
