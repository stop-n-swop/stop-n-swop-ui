import jpex from 'jpex';
import type { Navigate } from 'core/navigation';

const navigate = (window: Window): Navigate => (url) => {
  return new Promise(() => {
    const { location } = window;
    location.href = url;
  });
};

jpex.factory<Navigate>(navigate);
