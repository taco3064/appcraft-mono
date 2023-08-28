import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Collapse from '@mui/material/Collapse';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { CraftsmanStyle } from '@appcraft/craftsman';
import { Fragment, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { MainWidget, WidgetState } from '@appcraft/types';

import * as Comp from '~appcraft/components';
import { findConfig, searchHierarchy } from '~appcraft/services';
import { useFixedT } from '~appcraft/hooks';
import type { LayoutPropsEditorProps } from './LayoutPropsEditor.types';

export default function LayoutPropsEditor({
  value,
  onChange,
  onClose,
}: LayoutPropsEditorProps) {
  const { template } = value;
  const [at, ct] = useFixedT('app', 'appcraft');
  const [collapsed, setCollapsed] = useState(new Set<string>());

  const { data: hierarchy } = useQuery({
    enabled: Boolean(template.id),
    queryKey: ['widgets', { type: 'item', targets: [template.id] }],
    queryFn: searchHierarchy,
    refetchOnWindowFocus: false,
  });

  const { data: widget } = useQuery({
    enabled: Boolean(template.id),
    queryKey: [template.id],
    queryFn: findConfig<MainWidget>,
    refetchOnWindowFocus: false,
  });

  const items = Object.entries(widget.content.state || {}).sort(([k1], [k2]) =>
    k1 > k2 ? 1 : -1
  );

  return (
    <>
      <CraftsmanStyle.WidgetAppBar
        BackButtonProps={{
          icon: <ArrowBackIcon />,
          text: at('btn-back'),
          onClick: onClose,
        }}
      >
        <CraftsmanStyle.AutoBreakTypography
          primary={hierarchy[0].name}
          secondary={hierarchy[0].description}
        />
      </CraftsmanStyle.WidgetAppBar>

      <List disablePadding style={{ background: 'inherit' }}>
        {items.length === 0 && (
          <CraftsmanStyle.ListPlaceholder message={ct('msg-no-properties')} />
        )}

        {items.map(([category, states]) => (
          <Fragment key={category}>
            <ListItemButton
              onClick={() => {
                if (collapsed.has(category)) {
                  collapsed.delete(category);
                } else {
                  collapsed.add(category);
                }

                setCollapsed(new Set(collapsed));
              }}
            >
              <ListItemIcon>
                {collapsed.has(category) ? (
                  <ExpandLessIcon />
                ) : (
                  <ExpandMoreIcon />
                )}
              </ListItemIcon>

              <ListItemText
                primary={ct(`ttl-state-${category}`)}
                primaryTypographyProps={{
                  fontWeight: 'bolder',
                  variant: 'subtitle2',
                  color: collapsed.has(category)
                    ? 'text.secondary'
                    : 'secondary',
                }}
              />
            </ListItemButton>

            <Collapse in={!collapsed.has(category)}>
              {(Object.entries(states) as [string, WidgetState][]).map(
                ([propPath, state]) => {
                  // if (state.type === 'public') {
                  //   if (state.category === 'nodes') {
                  //     return (
                  //       <Comp.LayoutNodeItem
                  //         key={propPath}
                  //         state={state}
                  //         value={value.template[state.category][propPath]}
                  //         onChange={console.log}
                  //       />
                  //     );
                  //   } else if (state.category === 'props') {
                  //     return (
                  //       <Comp.LayoutPropItem
                  //         key={propPath}
                  //         state={state}
                  //         value={value.template[state.category][propPath]}
                  //         onChange={console.log}
                  //       />
                  //     );
                  //   } else if (state.category === 'todos') {
                  //     return (
                  //       <Comp.LayoutTodoItem
                  //         key={propPath}
                  //         state={state}
                  //         value={value.template[state.category][propPath]}
                  //         onChange={console.log}
                  //       />
                  //     );
                  //   }
                  // }

                  return null;
                }
              )}
            </Collapse>
          </Fragment>
        ))}
      </List>
    </>
  );
}
