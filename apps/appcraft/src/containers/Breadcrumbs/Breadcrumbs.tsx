import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Dialog from '@mui/material/Dialog';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/router';

import { CommonButton } from '~appcraft/components';
import { Link } from '~appcraft/styles';
import { useFixedT, useWidth } from '~appcraft/hooks';
import type * as Types from './Breadcrumbs.types';

export default function Breadcrumbs({
  ToolbarProps,
  action,
  onBack,
  onCustomize = (e) => e,
  onPush,
}: Types.BreadcrumbsProps) {
  const width = useWidth();
  const { back, pathname, push } = useRouter();
  const [at, bt] = useFixedT('app', 'breadcrumb');
  const [open, setOpen] = useState(false);

  const maxItems = useMemo(
    () => (width === 'xs' ? 3 : width === 'sm' ? 5 : 8),
    [width]
  );

  const list: Types.Breadcrumb[] = onCustomize(
    pathname
      .split('/')
      .slice(1)
      .map((url, i, arr) => ({
        text: bt(url),
        url: `/${arr.slice(0, i + 1).join('/')}`,
      }))
  );

  return (
    <>
      <Toolbar
        variant="dense"
        {...ToolbarProps}
        style={{ ...ToolbarProps?.style, userSelect: 'none' }}
      >
        <CommonButton
          btnVariant="icon"
          color="primary"
          icon={<ArrowBackIcon />}
          text={at('btn-back')}
          onClick={() => (onBack || back)()}
        />

        <MuiBreadcrumbs
          aria-label="breadcrumb"
          separator="›"
          itemsBeforeCollapse={0}
          maxItems={maxItems}
          slotProps={{
            collapsedIcon: {
              onClick: (e) => {
                e.stopPropagation();
                e.preventDefault();

                setOpen(true);
              },
            },
          }}
        >
          {list.map(({ text, url }, i, arr) => {
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

      <Dialog
        fullWidth
        maxWidth="xs"
        open={open}
        onClose={() => setOpen(false)}
      >
        <MenuList
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: (theme) => theme.spacing(1),
          }}
        >
          {list
            .slice(0, list.length - 1)
            .reverse()
            .map(({ text, url }) => (
              <MenuItem
                key={url.toString()}
                disabled={!url}
                sx={{ borderRadius: (theme) => theme.spacing(1) }}
                onClick={() => {
                  setOpen(false);

                  if (onPush && typeof url === 'string') {
                    onPush(url);
                  } else {
                    push(url);
                  }
                }}
              >
                {text}
              </MenuItem>
            ))}
        </MenuList>
      </Dialog>
    </>
  );
}
