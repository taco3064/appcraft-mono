import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import { useState } from 'react';

import { MenuDialog } from '../MenuDialog';
import type { BreadcrumbsProps } from './Breadcrumbs.types';

export default function Breadcrumbs({
  children,
  maxItems = 8,
  ...props
}: BreadcrumbsProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <MenuDialog
        open={open}
        onClose={() => setOpen(false)}
        onChange={(value) => value()}
        options={
          children
            ?.slice(0, children.length - maxItems + 1)
            .reverse()
            .map((child) => {
              const { children: primary, onClick } = child.props;

              return {
                primary,
                value: onClick,
              };
            }) as { primary: string; value: () => void }[]
        }
      />

      <MuiBreadcrumbs
        {...props}
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
        {children}
      </MuiBreadcrumbs>
    </>
  );
}
