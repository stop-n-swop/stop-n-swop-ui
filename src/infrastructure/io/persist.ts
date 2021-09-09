import jpex from 'jpex';
import type { Config, Persist, Storage } from 'core/io';

const persist = (storage: Storage, config: Config): Persist => {
  return {
    async get(key) {
      return JSON.parse(storage.get(key) || 'null');
    },
    async set(key, value) {
      storage.set(key, JSON.stringify(value), { domain: config.api.domain });
    },
    async delete(key) {
      storage.erase(key, { domain: config.api.domain });
    },
  };
};

jpex.factory<Persist>(persist);
