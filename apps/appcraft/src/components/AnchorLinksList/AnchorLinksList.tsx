import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import { useLinkHandles } from '~appcraft/hooks';
import type { AnchorLinksListProps } from './AnchorLinksList.types';

export default function AnchorLinksList({
  layouts,
  getWidgetOptions,
}: AnchorLinksListProps) {
  const [{ options }] = useLinkHandles(layouts);

  console.log('AnchorLinksList', layouts, options);

  return (
    <List>
      {options.map(({ todoName, todoPath }) => (
        <ListItemButton key={todoPath}>
          <ListItemText primary={todoName} secondary={todoPath} />
        </ListItemButton>
      ))}
    </List>
  );
}
