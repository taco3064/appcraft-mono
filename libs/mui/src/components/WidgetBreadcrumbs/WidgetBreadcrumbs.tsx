import AddIcon from '@mui/icons-material/Add';
import AppBar from '@mui/material/AppBar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import LinearProgress from '@mui/material/LinearProgress';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Suspense, useState } from 'react';
import type * as Appcraft from '@appcraft/types';

import * as Styles from '../../styles';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { useFixedT } from '../../hooks';
import type { WidgetBreadcrumbsProps } from './WidgetBreadcrumbs.types';

export default function WidgetBreadcrumbs({
  addable,
  breadcrumbs,
  fixedT,
  onAdd,
  onRedirect,
}: WidgetBreadcrumbsProps) {
  const ct = useFixedT(fixedT);

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
