import React from 'react';
import { screen, act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import createWrapper from '__tests__/createWrapper';
import 'infrastructure';
import { ids } from 'ui/messages';
import { createMemoryHistory } from 'history';
import { makeDashboardPath } from 'ui/constants/paths';
import OAuth2Login from 'react-simple-oauth2-login';
import Harness from 'react-harness';
import type { Config, Driver, Storage } from 'core/io';
import type { LoginResponse } from '@sns/contracts/user';
import Login from '../Login';

let push: jest.SpyInstance;
let driver: jest.Mock;
let storage: {
  getItem: jest.Mock;
  setItem: jest.Mock;
};

beforeEach(() => {
  driver = jest.fn<ReturnType<Driver>, []>(async () => {
    const data: LoginResponse = {
      userId: '',
      authToken: 'auth-token',
      refreshToken: 'refresh-token',
    };
    return {
      status: 200,
      data,
    };
  });
  storage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
  };
  const history = createMemoryHistory();
  push = jest.spyOn(history, 'push').mockImplementation();

  const OAuthStub = ({ children, onSuccess }: any) => (
    <button
      type="button"
      onClick={() => {
        onSuccess({
          access_token: 'my-access-token',
        });
      }}
    >
      {children}
    </button>
  );

  const wrapper = createWrapper({
    history,
    inject(jpex) {
      jpex.constant<Driver>(driver);
      jpex.constant<Storage>(storage as any);
      jpex.constant<Config>({
        api: { url: '' },
        oauth: {
          google: {
            url: '',
            clientId: '',
            scope: '',
          },
        },
        images: {
          url: '',
        },
        mango: {
          url: '',
          id: '',
        },
      });
    },
    Render({ children }) {
      return (
        <Harness Component={OAuth2Login} Stub={OAuthStub}>
          {children}
        </Harness>
      );
    },
  });

  render(<Login />, { wrapper });
});

it('renders the login page', () => {
  expect(screen.getByText(ids.auth.login.title)).toBeInTheDocument();
});

describe('when I submit the form', () => {
  beforeEach(async () => {
    userEvent.click(screen.getByText(ids.auth.login.google));
    await act(async () => null);
  });

  it('logs in', () => {
    expect(driver).toBeCalled();
    expect(storage.setItem).toBeCalled();
  });
  it('redirects to the redirect url', () => {
    expect(push).toBeCalledWith(makeDashboardPath());
  });
});
