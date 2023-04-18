import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';

import { CommonButton } from '~appcraft/components/common';
import { Link, GapToolbar } from '~appcraft/styles';
import { useFixedT } from '~appcraft/hooks';
import type * as Types from './Breadcrumbs.types';

export default function Breadcrumbs({
  ToolbarProps,
  breadcrumbs = {},
  stretches = [],
}: Types.BreadcrumbsProps) {
  const { back, pathname } = useRouter();
  const [at, bt] = useFixedT('app', 'breadcrumb');

  const [, ...list]: Types.Breadcrumb[] = pathname.split('/').map((url) => {
    const { [url]: breadcrumb } = breadcrumbs;

    return {
      text: breadcrumb?.text || bt(url),
      url: breadcrumb?.url || `/${url}`,
    };
  });

  return (
    <GapToolbar variant="dense" {...ToolbarProps}>
      <CommonButton
        btnVariant="icon"
        color="secondary"
        text={at('btn-back')}
        icon={ArrowBackIcon}
        onClick={() => back()}
      />

      <MuiBreadcrumbs separator="›" aria-label="breadcrumb">
        {list.concat(stretches).map(({ text, url }, i, arr) => {
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
            <Link variant="subtitle2" color="text.secondary" href={url}>
              {text}
            </Link>
          );
        })}
      </MuiBreadcrumbs>
    </GapToolbar>
  );
}
