import jpex from 'jpex';
import type { Temp } from 'core/io';

const temp = (): Temp => {
  const store: Record<string, any> = {};

  return {
    async get(key) {
      return store[key];
    },
    async set(key, value) {
      store[key] = value;
    },
    async delete(key) {
      delete store[key];
    },
  };
};

jpex.factory<Temp>(temp);
