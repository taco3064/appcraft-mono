import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import Collapse from '@mui/material/Collapse';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import _get from 'lodash/get';
import { Fragment, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { MainWidget, WidgetState } from '@appcraft/types';

import { findConfig } from '~appcraft/services';
import { useFixedT } from '~appcraft/contexts';
import type * as Types from './StateViewer.types';

const ICONS: Types.StateIcon = {
  props: <SettingsOutlinedIcon />,
  nodes: <WidgetsOutlinedIcon />,
  todos: <AssignmentOutlinedIcon />,
};

export default function StateViewer({ id }: Types.StateViewerProps) {
  const [ct] = useFixedT('appcraft');
  const [collapsed, setCollapsed] = useState(new Set<string>());

  const { data: widget } = useQuery({
    queryKey: [id],
    queryFn: findConfig<MainWidget>,
    refetchOnWindowFocus: false,
  });

  return (
    <List>
      {Object.entries(ICONS).map(([category, icon]) => {
        const list = Object.entries<WidgetState>(
          _get(widget, ['content', 'state', category]) || {}
        ).filter(([, { type }]) => type === 'public');

        return (
          <Fragment key={category}>
            <ListItemButton
              disabled={!list.length}
              selected={!collapsed.has(category)}
              onClick={() => {
                if (collapsed.has(category)) {
                  collapsed.delete(category);
                } else {
                  collapsed.add(category);
                }

                setCollapsed(new Set(collapsed));
              }}
            >
              <ListItemIcon>{icon}</ListItemIcon>

              <ListItemText
                primary={ct(`ttl-state-${category}`)}
                primaryTypographyProps={{
                  fontWeight: 'bolder',
                  variant: 'subtitle1',
                }}
              />

              <ListItemSecondaryAction>
                {collapsed.has(category) ? (
                  <ExpandMoreIcon />
                ) : (
                  <ExpandLessIcon />
                )}
              </ListItemSecondaryAction>
            </ListItemButton>

            <Collapse in={!list.length || !collapsed.has(category)}>
              {list.length === 0 && (
                <ListItem>
                  <ListItemIcon />

                  <ListItemText
                    primary={ct('msg-no-state')}
                    primaryTypographyProps={{
                      variant: 'h6',
                      color: 'text.secondary',
                    }}
                  />
                </ListItem>
              )}

              {list.map(
                ([path, { category, alias, description, ...state }]) => (
                  <ListItem key={path}>
                    <ListItemIcon />

                    <ListItemText
                      primary={
                        category !== 'props'
                          ? alias || ct('msg-no-alias')
                          : `${alias || ct('msg-no-alias')} (${_get(state, [
                              'options',
                              'type',
                            ])})`
                      }
                      secondary={description || path.replace(/.*nodes\./g, '')}
                      primaryTypographyProps={{
                        fontWeight: 'bolder',
                        color: alias ? 'text.primary' : 'error',
                      }}
                      secondaryTypographyProps={{
                        variant: 'caption',
                        color: 'text.secondary',
                      }}
                    />
                  </ListItem>
                )
              )}
            </Collapse>
          </Fragment>
        );
      })}
    </List>
  );
}
