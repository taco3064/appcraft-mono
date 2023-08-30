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
  const [expanded, setExpanded] = useState(new Set<string>());

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
              selected={expanded.has(category)}
              onClick={() => {
                if (expanded.has(category)) {
                  expanded.delete(category);
                } else {
                  expanded.add(category);
                }

                setExpanded(new Set(expanded));
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
                {expanded.has(category) ? (
                  <ExpandLessIcon />
                ) : (
                  <ExpandMoreIcon />
                )}
              </ListItemSecondaryAction>
            </ListItemButton>

            <Collapse in={!list.length || expanded.has(category)}>
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

              {list.map(([path, { alias, description }]) => (
                <ListItemButton key={path}>
                  <ListItemIcon />

                  <ListItemText
                    primary={alias}
                    secondary={description || path.replace(/.*nodes\./g, '')}
                  />
                </ListItemButton>
              ))}
            </Collapse>
          </Fragment>
        );
      })}
    </List>
  );
}
