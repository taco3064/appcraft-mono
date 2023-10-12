import Avatar from '@mui/material/Avatar';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import NextLink from 'next/link';
import { CraftsmanStyle } from '@appcraft/craftsman';
import { useState } from 'react';
import type { MouseEvent } from 'react';

import type * as Types from './ExplorerNavItem.types';

//* Methods
export const getMenuItems: Types.GetMenuItemsFn = (routes, superior = '') =>
  routes.reduce((result, route) => {
    const { isNavItem, pathname, routes: subRoutes } = route;

    if (isNavItem) {
      result.push({ ...route, pathname: `${superior}${pathname}` });
    } else if (Array.isArray(subRoutes)) {
      result.push(...getMenuItems(subRoutes, `${superior}${pathname}`));
    }

    return result;
  }, []);

//* Components
export default function ExplorerNavItem({
  active,
  basename,
  options,
  superior = '',
  onSubMenuPopover,
}: Types.ExplorerNavItemProps) {
  const [expanded, setExpanded] = useState(false);
  const { id, icon, subTitle, isNavItem, pathname } = options;
  const items = getMenuItems(options.routes || [], superior);
  const selected = active.startsWith(`${superior}${pathname}`);
  const ToggleIcon = expanded ? ExpandLess : ExpandMore;

  //* Event Handlers
  const handleSubMenuToggle = (e: MouseEvent<HTMLButtonElement>) => {
    const isExpanded = !expanded;
    const anchorEl: HTMLElement = e.currentTarget.closest(`#${id}`);

    e.preventDefault();
    setExpanded(isExpanded);

    onSubMenuPopover?.(
      !isExpanded
        ? undefined
        : {
            anchorEl,
            pathname,
            routes: items,
            onClose: () => setExpanded(false),
          }
    );
  };

  return (
    <>
      {!isNavItem ? (
        items
          .map((route) => (
            <ExplorerNavItem
              key={route.id}
              active={active}
              basename={basename}
              options={route}
              superior={pathname}
              onSubMenuPopover={onSubMenuPopover}
            />
          ))
          .flat()
      ) : (
        <>
          <ListItemButton
            id={id}
            selected={selected}
            {...(basename && {
              LinkComponent: NextLink,
              href: `${basename}${superior}${pathname}`,
            })}
          >
            <ListItemIcon sx={(theme) => ({ minWidth: theme.spacing(5) })}>
              {icon ? (
                <Icon color={selected ? 'secondary' : 'info'}>{icon}</Icon>
              ) : (
                <Avatar
                  variant="square"
                  sx={(theme) => ({
                    background: 'transparent',
                    color: selected
                      ? theme.palette.secondary.main
                      : theme.palette.info.main,
                    width: 32,
                    height: 32,
                  })}
                >
                  {subTitle.trim().charAt(0).toUpperCase()}
                </Avatar>
              )}
            </ListItemIcon>

            <ListItemText
              primaryTypographyProps={{
                variant: 'subtitle1',
                color: selected ? 'primary' : 'text.primary',
                fontWeight: 600,
              }}
              primary={subTitle}
            />

            {items.length === 0 ? null : (
              <CraftsmanStyle.TypeItemAction>
                <IconButton onClick={handleSubMenuToggle}>
                  <ToggleIcon />
                </IconButton>
              </CraftsmanStyle.TypeItemAction>
            )}
          </ListItemButton>

          {!onSubMenuPopover && (
            <Collapse in={expanded}>
              {items.map((route) => (
                <ExplorerNavItem
                  key={route.id}
                  active={active}
                  basename={basename}
                  superior={pathname}
                  options={route}
                />
              ))}
            </Collapse>
          )}
        </>
      )}
    </>
  );
}
