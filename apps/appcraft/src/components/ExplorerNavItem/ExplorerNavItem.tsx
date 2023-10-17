import Avatar from '@mui/material/Avatar';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import NextLink from 'next/link';
import { CraftsmanStyle } from '@appcraft/craftsman';
import { useState } from 'react';
import type { MouseEvent } from 'react';

import { ExplorerMenuItem } from '~appcraft/styles';
import type * as Types from './ExplorerNavItem.types';

//* Methods
export const getMenuItems: Types.GetMenuItemsFn = (routes, superior = '') =>
  routes.reduce((result, route) => {
    const { isNavItem, routes: subRoutes } = route;
    const pathname = `${superior}${route.pathname}`;

    if (isNavItem) {
      result.push({ ...route, pathname });
    } else if (Array.isArray(subRoutes)) {
      result.push(...getMenuItems(subRoutes, pathname));
    }

    return result;
  }, []);

//* Components
export default function ExplorerNavItem({
  anchor,
  active,
  basename,
  options,
  superior = '',
  onSubMenuPopover,
}: Types.ExplorerNavItemProps) {
  const { id, icon, subTitle, isNavItem } = options;
  const pathname = `${superior}${options.pathname}`;
  const items = getMenuItems(options.routes || []);
  const selected = active.startsWith(pathname);
  const [expanded, setExpanded] = useState(selected && anchor === 'left');
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
              {...{ active, anchor, basename, onSubMenuPopover }}
              key={route.id}
              options={route}
              superior={pathname}
            />
          ))
          .flat()
      ) : (
        <>
          <ExplorerMenuItem
            {...{ anchor, id, selected }}
            {...(basename && {
              LinkComponent: NextLink,
              href: `${basename}${pathname}`,
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
              primary={subTitle}
              primaryTypographyProps={{
                variant: 'subtitle1',
                color: selected ? 'primary' : 'text.primary',
                fontWeight: 600,
              }}
            />

            {items.length === 0 ? null : (
              <CraftsmanStyle.TypeItemAction>
                <IconButton onClick={handleSubMenuToggle}>
                  <ToggleIcon />
                </IconButton>
              </CraftsmanStyle.TypeItemAction>
            )}
          </ExplorerMenuItem>

          {!onSubMenuPopover && (
            <Collapse in={expanded}>
              {items.map((route) => (
                <ExplorerNavItem
                  {...{ active, anchor, basename }}
                  key={route.id}
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
