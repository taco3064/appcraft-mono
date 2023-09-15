import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { ExhibitorUtil } from '@appcraft/exhibitor';

import { useSelection } from '../../../contexts';
import type { WidgetEventProps } from './WidgetEvent.types';

export default function WidgetEvent({
  completePaths,
  elementName,
  path,
  onActive,
}: WidgetEventProps) {
  const [, selection] = useSelection(
    'todos',
    ExhibitorUtil.getPropPath([elementName, path]),
    completePaths
  );

  return (
    <ListItemButton onClick={() => onActive(completePaths)}>
      {selection || <ListItemIcon />}

      <ListItemText
        primary={path}
        primaryTypographyProps={{
          variant: 'subtitle2',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          color: 'text.primary',
        }}
      />
    </ListItemButton>
  );
}
