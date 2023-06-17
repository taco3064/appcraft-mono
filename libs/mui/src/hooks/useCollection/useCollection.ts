import _get from 'lodash.get';
import _set from 'lodash.set';
import { useMemo } from 'react';
import type * as Appcraft from '@appcraft/types';

import { OptionValues, useEditorContext } from '../../contexts';
import type { Collection } from './useCollection.types';

const useCollection = <V extends OptionValues>(defaultValues?: Collection) => {
  const { collectionPath, values } = useEditorContext<V>();

  const source = useMemo<object>(() => {
    const fields: Appcraft.WidgetField[] = ['nodes', 'props', 'todos'];

    return fields.reduce((result, field) => {
      const { [field as keyof V]: options = {} } = values;

      Object.entries(options as Record<string, unknown>).forEach(
        ([path, value]) => {
          if (path.startsWith(collectionPath)) {
            _set(result, path, field === 'props' ? value : Symbol(field));
          }
        }
      );

      return {};
    }, {});
  }, [collectionPath, values]);

  return {
    path: collectionPath,
    source,
    values:
      ((_get(source, collectionPath) || defaultValues) as Collection) || null,
  };
};

export default useCollection;
