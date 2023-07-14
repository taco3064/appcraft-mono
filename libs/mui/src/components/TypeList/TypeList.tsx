import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import List from '@mui/material/List';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

import * as Hooks from '../../hooks';
import * as Styles from '../../styles';
import { Breadcrumbs } from '../common';
import { TypeItem } from '../TypeItem';
import type { OptionValues } from '../../contexts';
import type { TypeListProps } from './TypeList.types';

export default function TypeList<V extends OptionValues>({
  collection,
  exclude = [],
  values,
  onChange,
  onCollectionPathChange,
}: TypeListProps<V>) {
  const ct = Hooks.useFixedT();

  const [breadcrumbs, { back: handleBack, to: handleTo }] =
    Hooks.usePropertyRouter(onCollectionPathChange);

  const [items, onItemAdd] = Hooks.useTypeItems<V>(
    collection,
    exclude,
    values,
    onChange
  );

  return (
    <List
      disablePadding
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

            {onItemAdd instanceof Function && (
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
      {!items.length ? (
        <Styles.ListPlaceholder message={ct('msg-no-properties')} />
      ) : (
        items.map(({ key, ...item }) => (
          <TypeItem key={key} {...item} onSubitemView={handleTo} />
        ))
      )}
    </List>
  );
}
