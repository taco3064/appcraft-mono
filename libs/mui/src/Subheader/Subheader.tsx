import Breadcrumbs from '@mui/material/Breadcrumbs';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import ListSubheader from '@mui/material/ListSubheader';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import type { SubheaderProps } from './Subheader.types';

export default function Subheader({
  breadcrumbs,
  open,
  onAddElement,
  onBack,
}: SubheaderProps) {
  return !open ? null : (
    <ListSubheader
      component={Toolbar}
      variant="dense"
      sx={{ background: 'inherit', gap: 1 }}
    >
      <IconButton size="small" onClick={() => onBack()}>
        <ChevronLeftIcon />
      </IconButton>

      <Breadcrumbs separator="." style={{ marginRight: 'auto' }}>
        {breadcrumbs.map(({ name, isArrayElement, isLast }, i) =>
          isLast ? (
            <Typography
              key={`${name}_${i}`}
              variant="subtitle1"
              color="secondary"
            >
              {isArrayElement ? `[${name}]` : name}
            </Typography>
          ) : (
            <Link
              key={`${name}_${i}`}
              component="button"
              underline="hover"
              variant="subtitle1"
              color="text.primary"
              onClick={() => onBack(i)}
            >
              {isArrayElement ? `[${name}]` : name}
            </Link>
          )
        )}
      </Breadcrumbs>

      {onAddElement && (
        <>
          <Divider flexItem orientation="vertical" />

          <IconButton size="small" onClick={() => onAddElement()}>
            <PlaylistAddIcon />
          </IconButton>
        </>
      )}
    </ListSubheader>
  );
}
