import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { TypeItemSelection } from '../TypeItemSelection';
import { getPropPath } from '../../../utils';
import { useStateSelection } from '../../../hooks';
import type { WidgetNodeProps } from './WidgetNode.types';

export default function WidgetNode({
  completePaths,
  defined,
  elementName,
  path,
  type,
  onActive,
}: WidgetNodeProps) {
  const [isState, selection] = useStateSelection(
    type,
    getPropPath([elementName, path]),
    completePaths,
    (props) => (defined ? null : <TypeItemSelection {...props} />)
  );

  return (
    <ListItemButton
      disableRipple={isState}
      onClick={() => !isState && onActive(completePaths)}
    >
      {selection || <ListItemIcon />}

      <ListItemText
        primary={path}
        secondary={type}
        secondaryTypographyProps={{ variant: 'caption' }}
        primaryTypographyProps={{
          variant: 'subtitle2',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      />
    </ListItemButton>
  );
}
