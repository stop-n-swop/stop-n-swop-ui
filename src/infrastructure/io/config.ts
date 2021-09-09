import jpex from 'jpex';
import { cleanEnv, str } from 'envalid';
import type { Config } from 'core/io';

jpex.factory<Config>((): Config => {
  const env = cleanEnv(import.meta.env, {
    VITE_API_URL: str(),
    VITE_DOMAIN: str(),
    VITE_OAUTH_GOOGLE_URL: str(),
    VITE_OAUTH_GOOGLE_CLIENT_ID: str(),
    VITE_OAUTH_GOOGLE_SCOPE: str(),
    VITE_IMG_URL: str(),
    VITE_PAYPAL_CLIENT_ID: str(),
  });

  return {
    api: {
      url: env.VITE_API_URL,
      domain: env.VITE_DOMAIN,
    },
    oauth: {
      google: {
        url: env.VITE_OAUTH_GOOGLE_URL,
        clientId: env.VITE_OAUTH_GOOGLE_CLIENT_ID,
        scope: env.VITE_OAUTH_GOOGLE_SCOPE,
      },
    },
    images: {
      url: env.VITE_IMG_URL,
    },
    paypal: {
      clientId: env.VITE_PAYPAL_CLIENT_ID,
    },
  };
});
