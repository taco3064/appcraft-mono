import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { ExhibitorUtil } from '@appcraft/exhibitor';

import { TypeItemSelection } from '../TypeItemSelection';
import { useStateSelection } from '../../../hooks';
import type { WidgetEventProps } from './WidgetEvent.types';

export default function WidgetEvent({
  completePaths,
  elementName,
  path,
  onActive,
}: WidgetEventProps) {
  const [_isState, selection] = useStateSelection(
    'todos',
    ExhibitorUtil.getPropPath([elementName, path]),
    completePaths,
    (props) => <TypeItemSelection {...props} />
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
