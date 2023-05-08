import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import { useWidgetItems } from './WidgetElements.hooks';
import type { WidgetElementsProps } from './WidgetElements.types';

export default function WidgetElements({
  superior,
  widgets = [],
}: WidgetElementsProps) {
  const items = useWidgetItems({ superior, widgets });

  return (
    <List>
      {items.map(({ id, description }) => (
        <ListItemButton key={id}>
          <ListItemText primary={description || id} />
        </ListItemButton>
      ))}
    </List>
  );
}
