import type { Reason } from 'domain/constants/auth';

export const LOGIN = '/login';
export const makeLoginPath = ({
  reason,
  pathname = '',
  search = '',
}: { reason?: Reason; pathname?: string; search?: string } = {}) => {
  if (reason != null || pathname) {
    const params = new URLSearchParams();
    if (reason != null) {
      params.append('reason', reason);
    }
    if (pathname) {
      params.append('redirect', `${pathname}${search}`);
    }
    const query = params.toString();
    return `${LOGIN}?${query}`;
  }
  return LOGIN;
};
export const LOGOUT = '/logout';

export const LEVEL_UP_USERNAME = '/my/username';
export const makeLevelUpUsernamePath = ({
  pathname,
  search,
}: {
  pathname: string;
  search: string;
}) => {
  const params = new URLSearchParams();
  params.append('redirect', `${pathname}${search}`);
  const query = params.toString();
  return `${LEVEL_UP_USERNAME}?${query}`;
};

export const LEVEL_UP_ADDRESS = '/my/address';
export const makeLevelUpAddressPath = ({
  pathname,
  search,
}: {
  pathname: string;
  search: string;
}) => {
  const params = new URLSearchParams();
  params.append('redirect', `${pathname}${search}`);
  const query = params.toString();
  return `${LEVEL_UP_ADDRESS}?${query}`;
};
