import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import { useNestedItems } from './NestedElements.hooks';
import type { NestedElementsProps } from './NestedElements.types';

export default function NestedElements({
  superior,
  widgets = [],
  onWidgetClick,
}: NestedElementsProps) {
  const items = useNestedItems({ superior, widgets });

  return (
    <List>
      {items.map((widget) => (
        <ListItemButton key={widget.id} onClick={() => onWidgetClick(widget)}>
          <ListItemText primary={widget.description || widget.id} />
        </ListItemButton>
      ))}
    </List>
  );
}
