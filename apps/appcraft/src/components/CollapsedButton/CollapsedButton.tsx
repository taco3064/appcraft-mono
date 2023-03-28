import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import { useState } from 'react';

import type * as Types from './CollapsedButton.types';

export default function CollapsedButton({
  CollapseProps,
  children,
  icon,
  onClick,
  ...props
}: Types.CollapsedButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <Toolbar
      disableGutters
      variant="dense"
      sx={(theme) => ({ gap: theme.spacing(0.5) })}
    >
      <IconButton
        {...props}
        {...(open && {
          sx: (theme) => ({ color: theme.palette.text.secondary }),
        })}
        onClick={(e) => {
          setOpen(!open);
          onClick?.(e);
        }}
      >
        {icon}
      </IconButton>

      <Collapse {...CollapseProps} orientation="horizontal" in={open}>
        {children}
      </Collapse>
    </Toolbar>
  );
}
