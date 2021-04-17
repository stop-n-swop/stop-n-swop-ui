import React from 'react';
import { screen, act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import createWrapper from '__tests__/createWrapper';
import 'adapters';
import { ids } from 'ui/messages';
import { createMemoryHistory } from 'history';
import { HOME } from 'ui/constants/paths';
import type { Driver, Storage } from 'ports/io';
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

  const wrapper = createWrapper({
    history,
    inject(jpex) {
      jpex.constant<Driver>(driver);
      jpex.constant<Storage>(storage as any);
    },
  });

  render(<Login />, { wrapper });
});

it('renders the login page', () => {
  expect(screen.getByText(ids.auth.login.title)).toBeInTheDocument();
});

describe('when I submit the form', () => {
  beforeEach(async () => {
    userEvent.click(screen.getByText(ids.auth.login.buttons.submit));
    await act(async () => null);
  });

  it('shows validation messages', () => {
    expect(
      screen.getByText(ids.auth.login.username.required),
    ).toBeInTheDocument();
    expect(
      screen.getByText(ids.auth.login.password.required),
    ).toBeInTheDocument();
  });
});

describe('when I enter username/password', () => {
  beforeEach(() => {
    userEvent.type(
      screen.getByLabelText(ids.auth.login.username.label),
      'test',
    );
    userEvent.type(
      screen.getByLabelText(ids.auth.login.password.label),
      'password',
    );
  });

  describe('when I submit the form', () => {
    beforeEach(async () => {
      userEvent.click(screen.getByText(ids.auth.login.buttons.submit));
      await act(async () => null);
    });

    it('logs in', () => {
      expect(driver).toBeCalled();
      expect(storage.setItem).toBeCalled();
    });
    it('redirects to the redirect url', () => {
      expect(push).toBeCalledWith(HOME);
    });
  });
});
