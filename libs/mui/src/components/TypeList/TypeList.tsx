import Breadcrumbs from '@mui/material/Breadcrumbs';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import Typography from '@mui/material/Typography';

import { IconTipButton, ListToolbar } from '../../styles';
import { TypeItem } from '../TypeItem';
import { OptionValues, useFixedT } from '../../contexts';
import { usePropertyRouter, useTypeItems } from '../../hooks';
import type { TypeListProps } from './TypeList.types';

export default function TypeList<V extends OptionValues>({
  disableSelection,
  superior,
  values,
  onChange,
  onCollectionPathChange,
}: TypeListProps<V>) {
  const ct = useFixedT();
  const { items, onItemAdd } = useTypeItems<V>(superior, values, onChange);
  const isModifiable = onItemAdd instanceof Function;

  const [breadcrumbs, { back: handleBack, to: handleTo }] = usePropertyRouter(
    onCollectionPathChange
  );

  return (
    <List
      subheader={
        breadcrumbs.length > 0 && (
          <ListToolbar>
            <IconTipButton
              title={ct('btn-back')}
              onClick={() => handleBack()}
              sx={{ margin: (theme) => theme.spacing(1, 0) }}
            >
              <ChevronLeftIcon />
            </IconTipButton>

            <Breadcrumbs separator="." style={{ marginRight: 'auto' }}>
              {breadcrumbs.map(({ name, isStructureArray }, i, arr) =>
                i === arr.length - 1 ? (
                  <Typography
                    key={`breadcrumb_${i}`}
                    variant="subtitle1"
                    color="secondary"
                  >
                    {isStructureArray ? `[${name}]` : name}
                  </Typography>
                ) : (
                  <Link
                    key={`breadcrumb_${i}`}
                    component="button"
                    underline="hover"
                    variant="subtitle1"
                    color="text.primary"
                    onClick={() => handleBack(i)}
                  >
                    {isStructureArray ? `[${name}]` : name}
                  </Link>
                )
              )}
            </Breadcrumbs>

            {isModifiable && (
              <IconTipButton
                title={ct('btn-add-prop')}
                size="small"
                onClick={onItemAdd}
              >
                <PlaylistAddIcon />
              </IconTipButton>
            )}
          </ListToolbar>
        )
      }
    >
      {items.map(({ key, collectionType, options, onDelete }) => (
        <TypeItem
          {...{ key, collectionType, disableSelection, options, onDelete }}
          onSubitemView={handleTo}
        />
      ))}
    </List>
  );
}
