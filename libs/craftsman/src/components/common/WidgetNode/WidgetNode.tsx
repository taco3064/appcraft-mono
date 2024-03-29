import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { ExhibitorUtil } from '@appcraft/exhibitor';

import { TypeItemAction } from '../../../styles';
import { useSecondaryAction, useSelection } from '../../../contexts';
import type { WidgetNodeProps } from './WidgetNode.types';

export default function WidgetNode({
  completePaths,
  elementName,
  path,
  type,
  onActive,
}: WidgetNodeProps) {
  const render = useSecondaryAction<string>('nodes');

  const [isState, selection] = useSelection(
    type,
    ExhibitorUtil.getPropPath([elementName, path]),
    completePaths
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
        primaryTypographyProps={{
          variant: 'subtitle2',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          color: isState ? 'text.secondary' : 'text.primary',
        }}
        secondaryTypographyProps={{
          variant: 'caption',
          display: '-webkit-box',
          overflow: 'hidden',
          whiteSpace: 'pre-line',
          style: { WebkitBoxOrient: 'vertical', WebkitLineClamp: 2 },
        }}
      />

      {render && (
        <TypeItemAction>
          {render(ExhibitorUtil.getPropPath(completePaths))}
        </TypeItemAction>
      )}
    </ListItemButton>
  );
}
