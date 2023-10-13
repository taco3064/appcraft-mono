import List from '@mui/material/List';
import { useEffect, useState } from 'react';

import ExplorerNavItem from '../ExplorerNavItem';
import { ExplorerMenuDrawer, ScaledPopover } from '~appcraft/styles';
import type { ExpandedNav } from '../ExplorerNavItem';
import type { ExplorerNavMenuProps } from './ExplorerNavMenu.types';

const selectedClassName = 'AppcraftExplorerNavMenu-selected';

export default function ExplorerNavMenu({
  active,
  anchor,
  basename,
  open,
  items,
  scale,
}: ExplorerNavMenuProps) {
  const [expanded, setExpanded] = useState<ExpandedNav>();

  useEffect(() => {
    if (!open) {
      setExpanded(undefined);
    }
  }, [open]);

  return (
    <>
      <ExplorerMenuDrawer {...{ anchor, open, selectedClassName }}>
        {!open
          ? null
          : items.map((page) => (
              <ExplorerNavItem
                key={page.id}
                active={active}
                basename={basename}
                options={page}
                selectedClassName={selectedClassName}
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
          open={Boolean(expanded?.anchorEl) && open}
          scale={scale}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          onClose={() => {
            expanded?.onClose();
            setExpanded(undefined);
          }}
        >
          <List disablePadding>
            {expanded?.routes.map((route) => (
              <ExplorerNavItem
                key={route.id}
                active={active}
                basename={basename}
                options={route}
                selectedClassName={selectedClassName}
                superior={expanded?.pathname}
              />
            ))}
          </List>
        </ScaledPopover>
      )}
    </>
  );
}
