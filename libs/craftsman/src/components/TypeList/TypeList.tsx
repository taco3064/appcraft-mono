import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import List from '@mui/material/List';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import type { NodeWidget } from '@appcraft/types';

import * as Hook from '../../hooks';
import * as Style from '../../styles';
import { Breadcrumbs, TypeItem } from '../common';
import type { OptionValues } from '../../contexts';
import type { TypeListProps } from './TypeList.types';

export default function TypeList<V extends OptionValues>({
  collection,
  exclude = [],
  values,
  onChange,
  onCollectionPathChange,
}: TypeListProps<V>) {
  const ct = Hook.useFixedT();

  const [breadcrumbs, { back: handleBack, to: handleTo }] =
    Hook.usePropertyRouter(onCollectionPathChange);

  const [items, onItemAdd] = Hook.useTypeItems<V>(
    collection,
    exclude,
    values,
    onChange
  );

  return (
    <List
      disablePadding
      style={{ background: 'inherit' }}
      subheader={
        breadcrumbs.length > 0 && (
          <Style.ListToolbar>
            <Style.IconTipButton
              title={ct('btn-back')}
              onClick={() => handleBack()}
            >
              <ArrowBackIcon />
            </Style.IconTipButton>

            <Breadcrumbs
              TopProps={{ text: ct('txt-top'), onClick: () => handleBack(-1) }}
              collapsedTitle={ct('ttl-props')}
              separator="."
              maxItems={2}
              style={{ marginRight: 'auto' }}
            >
              {breadcrumbs.map(({ name, isStructureArray }, i, arr) => (
                <Style.Breadcrumb
                  key={`breadcrumb_${i}`}
                  brcVariant={i === arr.length - 1 ? 'text' : 'link'}
                  onClick={() => handleBack(i)}
                >
                  {isStructureArray ? `[${name}]` : name}
                </Style.Breadcrumb>
              ))}
            </Breadcrumbs>

            {onItemAdd instanceof Function && (
              <Style.IconTipButton
                title={ct('btn-add-prop')}
                size="small"
                onClick={onItemAdd}
              >
                <PlaylistAddIcon />
              </Style.IconTipButton>
            )}
          </Style.ListToolbar>
        )
      }
    >
      {!items.length ? (
        <Style.ListPlaceholder message={ct('msg-no-properties')} />
      ) : (
        items.map(({ key, ...item }) => (
          <TypeItem
            key={key}
            {...item}
            elementName={(values as NodeWidget).typeName}
            onSubitemView={handleTo}
          />
        ))
      )}
    </List>
  );
}
