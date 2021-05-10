import jpex, { Global } from 'jpex';
import type { Driver } from 'core/io';
import { responseToError } from '@sns/abyss';

type Fetch = typeof window.fetch;

const isJson = (response: Response) => {
  const contentType = response.headers.get('Content-Type');
  return contentType?.includes('json') || contentType?.includes('javascript');
};

const makeQuery = (data: Record<string, any>) => {
  const params = new URLSearchParams();
  Object.entries(data).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((el) => {
        params.append(`${key}[]`, `${el}`);
      });
    } else {
      params.append(key, `${value}`);
    }
  });
  return params.toString();
};

const makeUrl = (url: string, params?: Record<string, any>) => {
  if (params == null || !Object.keys(params).length) {
    return url;
  }
  return Object.entries(params).reduce((url, [key, value]) => {
    const ident = `{${key}}`;
    return url.replace(ident, encodeURIComponent(`${value}`));
  }, url);
};

const makeHeaders = (headers: Record<string, string>) => {
  return Object.entries({
    'Content-Type': 'application/json',
    ...headers,
  }).reduce((headers, entry) => {
    if (entry[1] == null) {
      return headers;
    }
    return [...headers, entry];
  }, []);
};

const appendData = (
  data: Record<string, any>,
  url: string,
  method: string,
  payload: RequestInit,
) => {
  if (data) {
    if (method === 'GET') {
      // eslint-disable-next-line no-param-reassign
      url = `${url}?${makeQuery(data)}`;
    } else if (data instanceof FormData) {
      // eslint-disable-next-line no-param-reassign
      payload.body = data;
    } else {
      // eslint-disable-next-line no-param-reassign
      payload.body = JSON.stringify(data);
    }
  }
  return url;
};

const handleErrorResponse = async (response: Response) => {
  if (isJson(response)) {
    const json = await response.json();
    // eslint-disable-next-line prefer-promise-reject-errors
    return responseToError({
      status: response.status,
      error: json,
    });
  }
  const text = await response.text();
  return responseToError({
    status: response.status,
    error: text as any,
  });
};

const driver = (fetch: Global<'fetch', Fetch>): Driver => async ({
  url: rawUrl,
  method = 'GET',
  data,
  params,
  headers: customHeaders,
}) => {
  const payload: RequestInit = {};
  let url = makeUrl(rawUrl, params);
  url = appendData(data, url, method, payload);
  const headers = makeHeaders(customHeaders);

  payload.method = method;
  if (headers.length) {
    payload.headers = headers;
  }

  const response = await fetch(url, payload);

  if (!response.ok) {
    const error = await handleErrorResponse(response);
    throw error;
  }

  const result = isJson(response) ? await response.json() : null;

  return {
    status: response.status,
    data: result,
  };
};

jpex.factory<Driver>(driver);
