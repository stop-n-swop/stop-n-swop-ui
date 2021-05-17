import jpex from 'jpex';
import type { Config } from 'core/io';

jpex.factory<Config>(() => ({
  api: {
    url: import.meta.env.VITE_API_URL,
  },
  oauth: {
    google: {
      url: import.meta.env.VITE_OAUTH_GOOGLE_URL,
      clientId: import.meta.env.VITE_OAUTH_GOOGLE_CLIENT_ID,
      scope: import.meta.env.VITE_OAUTH_GOOGLE_SCOPE,
    },
  },
  images: {
    url: import.meta.env.VITE_IMG_URL,
  },
}));
