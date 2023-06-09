import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';

import { CommonButton } from '../common';
import { Link } from '~appcraft/styles';
import { useFixedT } from '~appcraft/hooks';
import type * as Types from './Breadcrumbs.types';

export default function Breadcrumbs({
  ToolbarProps,
  action,
  onCustomize = (e) => e,
}: Types.BreadcrumbsProps) {
  const { back, pathname } = useRouter();
  const [at, bt] = useFixedT('app', 'breadcrumb');

  const list: Types.Breadcrumb[] = pathname
    .split('/')
    .slice(1)
    .map((url, i, arr) => ({
      text: bt(url),
      url: `/${arr.slice(0, i + 1).join('/')}`,
    }));

  return (
    <Toolbar variant="dense" {...ToolbarProps}>
      <CommonButton
        btnVariant="icon"
        color="secondary"
        text={at('btn-back')}
        icon={ArrowBackIcon}
        onClick={() => back()}
      />

      <MuiBreadcrumbs separator="›" aria-label="breadcrumb">
        {onCustomize(list).map(({ text, url }, i, arr) => {
          const isLast = i === arr.length - 1;
          const isTypography = !url || i === arr.length - 1;

          return isTypography ? (
            <Typography
              key={`${text}-${i}`}
              variant="subtitle2"
              color={`text.${isLast ? 'primary' : 'secondary'}`}
            >
              {text}
            </Typography>
          ) : (
            <Link
              key={`${text}-${i}`}
              variant="subtitle2"
              color="text.secondary"
              href={url}
            >
              {text}
            </Link>
          );
        })}
      </MuiBreadcrumbs>

      <Toolbar disableGutters style={{ marginLeft: 'auto' }}>
        {action}
      </Toolbar>
    </Toolbar>
  );
}
