import Avatar from '@mui/material/Avatar';
import Collapse from '@mui/material/Collapse';
import Drawer from '@mui/material/Drawer';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Icon from '@mui/material/Icon';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { CraftsmanStyle } from '@appcraft/craftsman';
import { useState } from 'react';
import type { MouseEvent } from 'react';

import { ScaledPopover } from '~appcraft/styles';
import type * as Types from './WebsiteNavMenu.types';

//* Methods
const getMenuItems: Types.GetMenuItemsFn = (routes, superior = '') =>
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
function NavTab({
  superior = '',
  options,
  onSubMenuPopover,
}: Types.NavTabProps) {
  const [expanded, setExpanded] = useState(false);
  const { id, icon, subTitle, isNavItem, pathname } = options;
  const items = getMenuItems(options.routes || [], superior);
  const ToggleIcon = expanded ? ExpandLess : ExpandMore;

  //* Event Handlers
  const handleSubMenuToggle = (e: MouseEvent<SVGSVGElement>) => {
    const isExpanded = !expanded;
    const anchorEl: HTMLElement = e.currentTarget.closest(`#${id}`);

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

  return isNavItem ? (
    <>
      <Tab
        iconPosition="end"
        id={id}
        label={
          <CraftsmanStyle.GapTypography
            variant="subtitle1"
            color="primary"
            fontWeight={600}
          >
            <span
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: 36,
              }}
            >
              {icon ? (
                <Icon color="info">{icon}</Icon>
              ) : (
                <Avatar
                  variant="square"
                  sx={(theme) => ({
                    background: 'transparent',
                    color: theme.palette.info.main,
                    width: 32,
                    height: 32,
                  })}
                >
                  {subTitle.trim().charAt(0).toUpperCase()}
                </Avatar>
              )}
            </span>

            {subTitle}
          </CraftsmanStyle.GapTypography>
        }
        icon={
          items.length ? (
            <ToggleIcon color="action" onClick={handleSubMenuToggle} />
          ) : (
            <>&nbsp;</>
          )
        }
        sx={{
          justifyContent: 'flex-start',
          opacity: 1,
          minHeight: 48,
          textTransform: 'capitalize',
          ...(!onSubMenuPopover && {
            width: '100%',
          }),
        }}
      />

      {!onSubMenuPopover && (
        <Collapse in={expanded}>
          {items.map((route) => (
            <NavTab key={route.id} superior={pathname} options={route} />
          ))}
        </Collapse>
      )}
    </>
  ) : (
    <>
      {items
        .map((route) => (
          <NavTab
            key={route.id}
            options={route}
            superior={pathname}
            onSubMenuPopover={onSubMenuPopover}
          />
        ))
        .flat()}
    </>
  );
}

export default function WebsiteNavMenu({
  open,
  options,
  scale,
}: Types.WebsiteNavMenuProps) {
  const isAnchorTop = options.navAnchor === 'top';
  const items = getMenuItems(options.pages);
  const [expanded, setExpanded] = useState<Types.ExpandedNav>();

  return (
    <Drawer
      variant="persistent"
      anchor={options.navAnchor}
      open={open}
      onClick={(e) => e.stopPropagation()}
      PaperProps={{
        sx: (theme) => ({
          userSelect: 'none',

          ...(isAnchorTop
            ? { position: 'absolute' }
            : { maxWidth: theme.breakpoints.values.sm * 0.8 }),
        }),
      }}
    >
      {open && (
        <Tabs
          selectionFollowsFocus
          orientation={isAnchorTop ? 'horizontal' : 'vertical'}
          {...(isAnchorTop && {
            allowScrollButtonsMobile: true,
            scrollButtons: 'auto',
            variant: 'scrollable',
          })}
          sx={{
            ...(isAnchorTop && {
              '& div[role=tablist]': {
                '& > button:first-child': {
                  marginLeft: 'auto',
                },
                '& > button:last-child': {
                  marginRight: 'auto',
                },
              },
            }),
          }}
        >
          {items.map((page) => (
            <NavTab
              key={page.id}
              options={page}
              {...(isAnchorTop && {
                onSubMenuPopover: setExpanded,
              })}
            />
          ))}
        </Tabs>
      )}

      {isAnchorTop && (
        <ScaledPopover
          PaperProps={{ elevation: 1 }}
          anchorEl={expanded?.anchorEl}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          open={Boolean(expanded?.anchorEl)}
          scale={scale}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          onClose={() => {
            expanded?.onClose();
            setExpanded(undefined);
          }}
        >
          <Tabs
            allowScrollButtonsMobile
            orientation="vertical"
            scrollButtons="auto"
            selectionFollowsFocus
            variant="scrollable"
          >
            {expanded?.routes.map((route) => (
              <NavTab
                key={route.id}
                options={route}
                superior={expanded?.pathname}
              />
            ))}
          </Tabs>
        </ScaledPopover>
      )}
    </Drawer>
  );
}
