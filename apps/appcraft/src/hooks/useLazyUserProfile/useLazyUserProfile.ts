import axios from 'axios';
import { lazy, useMemo, useRef } from 'react';
import type { LazyRenderer } from '@appcraft/types';

const useLazyUserProfile = <D, R = Record<string, never>>(
  idToken,
  renderer: LazyRenderer<D, R>
) => {
  const renderRef = useRef(renderer);

  return useMemo(
    () =>
      lazy(async () => {
        if (idToken) {
          const { data: fetchData } = await axios.get('/api/userinfo/profile');

          return {
            default: (props: R) => renderRef.current({ ...props, fetchData }),
          };
        }

        return {
          default: (props: R) =>
            renderRef.current({ ...props, fetchData: null }),
        };
      }),
    [idToken]
  );
};

export default useLazyUserProfile;
