import jpex from 'jpex';
import type { Navigate } from 'core/navigation';

const navigate =
  (location: Location): Navigate =>
  (url) => {
    return new Promise(() => {
      location.assign(url);
    });
  };

jpex.factory<Navigate>(navigate);
