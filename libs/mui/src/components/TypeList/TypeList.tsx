import Breadcrumbs from '@mui/material/Breadcrumbs';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import List from '@mui/material/List';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

import * as Styles from '../../styles';
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
          <Styles.ListToolbar>
            <Styles.IconTipButton
              title={ct('btn-back')}
              onClick={() => handleBack()}
              sx={{ margin: (theme) => theme.spacing(1, 0) }}
            >
              <ChevronLeftIcon />
            </Styles.IconTipButton>

            <Breadcrumbs separator="." style={{ marginRight: 'auto' }}>
              {breadcrumbs.map(({ name, isStructureArray }, i, arr) =>
                i === arr.length - 1 ? (
                  <Styles.BreadcrumbText key={`breadcrumb_${i}`}>
                    {isStructureArray ? `[${name}]` : name}
                  </Styles.BreadcrumbText>
                ) : (
                  <Styles.BreadcrumbLink
                    key={`breadcrumb_${i}`}
                    onClick={() => handleBack(i)}
                  >
                    {isStructureArray ? `[${name}]` : name}
                  </Styles.BreadcrumbLink>
                )
              )}
            </Breadcrumbs>

            {isModifiable && (
              <Styles.IconTipButton
                title={ct('btn-add-prop')}
                size="small"
                onClick={onItemAdd}
              >
                <PlaylistAddIcon />
              </Styles.IconTipButton>
            )}
          </Styles.ListToolbar>
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
