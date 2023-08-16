import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import { useState } from 'react';

import MenuDialog from '../MenuDialog';
import { Breadcrumb } from '../../../styles';
import type * as Types from './Breadcrumbs.types';

export default function Breadcrumbs({
  TopProps,
  children,
  collapsedTitle,
  maxItems = 8,
  ...props
}: Types.BreadcrumbsProps) {
  const hasBreadcrumbs = Boolean(children?.length);

  const [open, setOpen] = useState(false);

  const options = children
    ?.slice(0, children.length - 1)
    .reverse()
    .map((child) => {
      const { children: primary, onClick } = child.props;

      return {
        primary,
        value: onClick,
      };
    }) as Types.MenuOptions;

  return (
    <>
      <MenuDialog
        title={collapsedTitle}
        open={open}
        onClose={() => setOpen(false)}
        onChange={(value) => value()}
        options={[
          ...options,
          ...(!hasBreadcrumbs || !TopProps
            ? []
            : [
                {
                  primary: TopProps.text,
                  value: TopProps.onClick,
                },
              ]),
        ]}
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
        {hasBreadcrumbs && TopProps && (
          <Breadcrumb brcVariant="link" onClick={TopProps.onClick}>
            {TopProps.text}
          </Breadcrumb>
        )}

        {children}
      </MuiBreadcrumbs>
    </>
  );
}
