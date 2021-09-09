import type cookies from 'browser-cookies';

export interface Response<T> {
  status: number;
  data: T;
}

export type Driver = <Req = Record<string, unknown>, Res = void>(args: {
  url: string;
  method?: string;
  data?: Req;
  params?: Record<string, any>;
  headers?: Record<string, string>;
}) => Promise<Response<Res>>;

export type AuthDriver = Driver;

export type Persist = {
  get<T>(key: string): Promise<T>;
  set<T>(key: string, value: T): Promise<void>;
  delete(key: string): Promise<void>;
};

export type Temp = {
  get<T>(key: string): Promise<T>;
  set<T>(key: string, value: T): Promise<void>;
  delete(key: string): Promise<void>;
};

export type Storage = typeof cookies;

export interface Config {
  api: {
    url: string;
    domain: string;
  };
  oauth: Record<
    string,
    {
      url: string;
      clientId: string;
      scope: string;
    }
  >;
  images: {
    url: string;
  };
  paypal: {
    clientId: string;
  };
}

export type Track = (
  evt: string,
  data?: { value?: number; unit?: string },
) => void;

export type TrackEvents = () => void;
