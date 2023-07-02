import * as idb from 'idb';
import { compareVersions } from 'compare-versions';
import type { AppcraftDB } from '@appcraft/types';

const getIdbVersion = (version?: string) => {
  if (global.localStorage && version) {
    const prevVersion = global.localStorage.getItem('appcraft-version');

    if (!prevVersion) {
      global.localStorage.setItem('appcraft-version', version);
      global.localStorage.setItem('appcraft-idb-version', '1');

      return 1;
    } else if (compareVersions(prevVersion, version) < 0) {
      const idbVersion = Number.parseInt(
        global.localStorage.getItem('appcraft-idb-version') || '1',
        10
      );

      global.localStorage.setItem('appcraft-version', version);
      global.localStorage.setItem('appcraft-idb-version', `${idbVersion + 1}`);

      return idbVersion + 1;
    }

    return Number.parseInt(
      global.localStorage.getItem('appcraft-idb-version') || '1',
      10
    );
  }

  return undefined;
};

export const getDB = (version?: string) =>
  idb.openDB<AppcraftDB>('appcraft', getIdbVersion(version), {
    upgrade(db) {
      const { objectStoreNames: stores } = db;

      stores.contains('nodes') && db.deleteObjectStore('nodes');
      stores.contains('events') && db.deleteObjectStore('events');
      db.createObjectStore('nodes');
      db.createObjectStore('events');
    },
  });
