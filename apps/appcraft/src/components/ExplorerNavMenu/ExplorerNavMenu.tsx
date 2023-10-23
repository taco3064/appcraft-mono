import List from '@mui/material/List';
import { useEffect, useState } from 'react';

import ExplorerNavItem from '../ExplorerNavItem';
import { ExplorerMenuDrawer, ScaledPopover } from '~appcraft/styles';
import type { ExpandedNav } from '../ExplorerNavItem';
import type { ExplorerNavMenuProps } from './ExplorerNavMenu.types';

export default function ExplorerNavMenu({
  active,
  anchor,
  basename,
  open,
  items,
  scale,
}: ExplorerNavMenuProps) {
  const [expanded, setExpanded] = useState<ExpandedNav>();
  const isOpen = open || anchor === 'top';

  useEffect(() => {
    if (!isOpen) {
      setExpanded(undefined);
    }
  }, [isOpen]);

  return (
    <>
      <ExplorerMenuDrawer {...{ anchor, open: isOpen }}>
        {!isOpen
          ? null
          : items.map((page) => (
              <ExplorerNavItem
                {...{ active, anchor, basename }}
                key={page.id}
                options={page}
                {...(anchor === 'top' && {
                  onSubMenuPopover: setExpanded,
                })}
              />
            ))}
      </ExplorerMenuDrawer>

      {anchor === 'top' && (
        <ScaledPopover
          PaperProps={{ elevation: 1 }}
          anchorEl={expanded?.anchorEl}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          contentWidth={expanded?.anchorEl.clientWidth}
          open={Boolean(expanded?.anchorEl) && isOpen}
          scale={scale}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          onClose={() => {
            expanded?.onClose();
            setExpanded(undefined);
          }}
        >
          <List disablePadding style={{ width: '100%' }}>
            {expanded?.routes.map((route) => (
              <ExplorerNavItem
                {...{ active, basename }}
                key={route.id}
                options={route}
                superior={expanded?.pathname}
              />
            ))}
          </List>
        </ScaledPopover>
      )}
    </>
  );
}
