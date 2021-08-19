import jpex from 'jpex';
import type { Emit, Subscribe } from 'core/events';

jpex.factory<Emit>(
  (window: Window): Emit =>
    (key, data) => {
      const event = new CustomEvent(key, {
        bubbles: false,
        cancelable: false,
        detail: data,
      });
      window.dispatchEvent(event);
    },
);

jpex.factory<Subscribe>(
  (window: Window): Subscribe =>
    (key, callback) => {
      window.addEventListener(
        key,
        (e: CustomEvent) => {
          callback(e.detail);
        },
        false,
      );
    },
);
