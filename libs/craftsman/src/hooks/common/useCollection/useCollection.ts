import _get from 'lodash/get';
import _set from 'lodash/set';
import { useMemo } from 'react';

import { OptionValues, useEditorContext } from '../../../contexts';
import type { Collection } from './useCollection.types';

export const useCollection = <V extends OptionValues>(
  defaultValues?: Collection
) => {
  const { collectionPath, values } = useEditorContext<V>();

  const source = useMemo<object>(() => {
    const { props = {}, mixedTypes = {} } = values;

    return Object.keys({ ...mixedTypes, ...props }).reduce((result, path) => {
      if (path.startsWith(collectionPath)) {
        _set(result, path, _get(props, [path], null));
      }

      return result;
    }, {});
  }, [collectionPath, values]);

  return {
    path: collectionPath,
    source,
    values:
      (!collectionPath ? source : _get(source, collectionPath)) ||
      defaultValues,
  };
};
