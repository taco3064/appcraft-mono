import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { TypeItemSelection } from '../TypeItemSelection';
import { getPropPath } from '../../../utils';
import { useStateSelection } from '../../../hooks';
import type { WidgetNodeProps } from './WidgetNode.types';

export default function WidgetNode({
  completePaths,
  elementName,
  path,
  type,
  onActive,
}: WidgetNodeProps) {
  const [isState, selection] = useStateSelection(
    'nodes',
    getPropPath([elementName, path]),
    completePaths,
    (props) => <TypeItemSelection {...props} />
  );

  return (
    <ListItemButton onClick={() => onActive(completePaths)}>
      {selection || <ListItemIcon />}

      <ListItemText
        primary={path}
        secondary={type}
        primaryTypographyProps={{
          variant: 'subtitle2',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
        secondaryTypographyProps={{ variant: 'caption' }}
      />
    </ListItemButton>
  );
}
