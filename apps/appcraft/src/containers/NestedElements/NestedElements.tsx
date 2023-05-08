import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import { useNestedItems } from './NestedElements.hooks';
import type { NestedElementsProps } from './NestedElements.types';

export default function NestedElements({
  superior,
  widgets = [],
}: NestedElementsProps) {
  const items = useNestedItems({ superior, widgets });

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
