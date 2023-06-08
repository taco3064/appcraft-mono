import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useMemo } from 'react';

import { useFixedT } from '../../contexts';
import type { NestedElementsProps } from './NestedElements.types';

export default function NestedElements({
  fixedT,
  superior,
  widgets = [],
  onWidgetSelect,
}: NestedElementsProps) {
  const ct = useFixedT(fixedT);

  const items = useMemo(
    () =>
      widgets.filter(({ superior: $superior }) =>
        !superior ? !$superior : superior === $superior
      ),
    [superior, widgets]
  );

  return (
    <List>
      {items.length === 0 && (
        <ListItem>
          <ListItemText
            primaryTypographyProps={{
              variant: 'h6',
              color: 'text.secondary',
              align: 'center',
              sx: { marginTop: (theme) => theme.spacing(2) },
            }}
            primary={ct('msg-no-elements')}
          />
        </ListItem>
      )}

      {items.map((widget) => (
        <ListItemButton
          key={widget.id}
          onClick={() => onWidgetSelect(widget.id)}
        >
          <ListItemText primary={widget.description || widget.id} />
        </ListItemButton>
      ))}
    </List>
  );
}
