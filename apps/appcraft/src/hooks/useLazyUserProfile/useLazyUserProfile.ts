import axios from 'axios';
import { lazy, useEffect, useMemo, useRef, useState } from 'react';
import type { LazyRenderer } from '@appcraft/types';

export const useLazyUserProfile = <D, R = Record<string, never>>(
  idToken,
  renderer: LazyRenderer<D, R>
) => {
  const [fetchPromise, setFetchPromise] = useState<Promise<D | undefined>>();
  const renderRef = useRef(renderer);

  useEffect(() => {
    setFetchPromise(
      !idToken
        ? Promise.resolve(undefined)
        : axios.get('/api/userinfo/profile').then(({ data }) => data as D)
    );
  }, [idToken]);

  return useMemo(
    () =>
      lazy(async () => {
        const fetchData = (await fetchPromise) || null;

        return {
          default: (props: R) => renderRef.current({ ...props, fetchData }),
        };
      }),
    [fetchPromise]
  );
};
