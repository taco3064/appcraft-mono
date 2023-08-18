import { useEffect, useState } from 'react';
import type { HeightHook } from './useHeight.types';

export const useHeight: HeightHook = () => {
  const [height, setHeight] = useState(`${global.window?.innerHeight || 0}px`);

  useEffect(() => {
    if (global.window) {
      const resizeHandle = () =>
        setHeight(`${global.window?.innerHeight || 0}px`);

      global.window.addEventListener('resize', resizeHandle);

      return () => global.window.removeEventListener('resize', resizeHandle);
    }
  }, []);

  return height;
};
