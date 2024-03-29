import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { ExhibitorUtil } from '@appcraft/exhibitor';

import { TypeItemAction } from '../../../styles';
import { useSecondaryAction, useSelection } from '../../../contexts';
import type { WidgetEventProps } from './WidgetEvent.types';

export default function WidgetEvent({
  completePaths,
  elementName,
  path,
  onActive,
}: WidgetEventProps) {
  const render = useSecondaryAction<string>('todos');

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

      {render && (
        <TypeItemAction>
          {render(ExhibitorUtil.getPropPath(completePaths))}
        </TypeItemAction>
      )}
    </ListItemButton>
  );
}
