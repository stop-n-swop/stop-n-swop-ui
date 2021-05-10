import jpex from 'jpex';
import type { Persist, Storage } from 'core/io';

const persist = (storage: Storage): Persist => {
  return {
    async get(key) {
      return JSON.parse(storage.getItem(key) || 'null');
    },
    async set(key, value) {
      storage.setItem(key, JSON.stringify(value));
    },
    async delete(key) {
      storage.removeItem(key);
    },
  };
};

jpex.factory<Persist>(persist);
