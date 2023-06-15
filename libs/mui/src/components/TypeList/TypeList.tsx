import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import List from '@mui/material/List';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

import * as Styles from '../../styles';
import { Breadcrumbs } from '../common';
import { OptionValues, useFixedT } from '../../contexts';
import { TypeItem } from '../TypeItem';
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
            >
              <ArrowBackIcon />
            </Styles.IconTipButton>

            <Breadcrumbs
              separator="."
              maxItems={2}
              style={{ marginRight: 'auto' }}
            >
              {breadcrumbs.map(({ name, isStructureArray }, i, arr) => (
                <Styles.Breadcrumb
                  key={`breadcrumb_${i}`}
                  brcVariant={i === arr.length - 1 ? 'text' : 'link'}
                  onClick={() => handleBack(i)}
                >
                  {isStructureArray ? `[${name}]` : name}
                </Styles.Breadcrumb>
              ))}
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
