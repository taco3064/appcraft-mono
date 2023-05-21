import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import { useFixedT } from '~appcraft/hooks';
import { useNestedItems } from './NestedElements.hooks';
import type { NestedElementsProps } from './NestedElements.types';

export default function NestedElements({
  superior,
  widgets = [],
  onWidgetClick,
}: NestedElementsProps) {
  const [wt] = useFixedT('widgets');
  const items = useNestedItems({ superior, widgets });

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
            primary={wt('msg-no-elements')}
          />
        </ListItem>
      )}

      {items.map((widget) => (
        <ListItemButton
          key={widget.id}
          onClick={() => onWidgetClick(widget.id)}
        >
          <ListItemText primary={widget.description || widget.id} />
        </ListItemButton>
      ))}
    </List>
  );
}
