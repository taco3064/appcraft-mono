import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { ExhibitorUtil } from '@appcraft/exhibitor';

import TypeItemSelection from '../TypeItemSelection';
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
    ExhibitorUtil.getPropPath([elementName, path]),
    completePaths,
    (props) => (defined ? null : <TypeItemSelection {...props} />)
  );

  return (
    <ListItemButton
      disableRipple={isState}
      onClick={() => !isState && onActive(completePaths, type)}
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
          color: isState ? 'text.secondary' : 'text.primary',
        }}
      />
    </ListItemButton>
  );
}
