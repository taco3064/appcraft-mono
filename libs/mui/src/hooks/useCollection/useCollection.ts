import _get from 'lodash.get';
import _set from 'lodash.set';
import { useMemo } from 'react';

import { OptionValues, useEditorContext } from '../../contexts';
import type { Collection } from './useCollection.types';

const useCollection = <V extends OptionValues>(defaultValues?: Collection) => {
  const { collectionPath, values } = useEditorContext<V>();

  const source = useMemo<object>(
    () =>
      Object.entries(values.props || {}).reduce((result, [path, value]) => {
        if (path.startsWith(collectionPath)) {
          _set(result, path, value);
        }

        return result;
      }, {}),
    [collectionPath, values]
  );

  return {
    path: collectionPath,
    source,
    values:
      ((_get(source, collectionPath) || defaultValues) as Collection) || null,
  };
};

export default useCollection;
