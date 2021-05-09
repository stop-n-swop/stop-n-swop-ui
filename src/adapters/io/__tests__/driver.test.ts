import { UnknownError } from '@sns/abyss';
import base, { Global } from 'jpex';
import type { Driver } from 'ports/io';
import '../driver';

const setup = () => {
  const jpex = base.extend();
  const json = { someValue: true };
  const text = 'text';
  const response = {
    ok: true,
    status: 200,
    headers: {
      get: jest.fn().mockReturnValue('application/json'),
    },
    json: jest.fn().mockResolvedValue(json),
    text: jest.fn().mockResolvedValue(text),
  };
  const fetch = jest.fn().mockResolvedValue(response);

  const driver = jpex.resolveWith<Driver, Global<'fetch'>>([fetch]);

  return {
    json,
    text,
    response,
    fetch,
    driver,
  };
};

it('makes a fetch request', async () => {
  const { driver, fetch } = setup();

  await driver({ url: '/api' });

  expect(fetch).toBeCalledWith('/api', {
    headers: [['Content-Type', 'application/json']],
    method: 'GET',
  });
});
it('returns the status and response data', async () => {
  const { driver } = setup();

  const response = await driver({ url: '/api' });

  expect(response).toEqual({
    status: 200,
    data: {
      someValue: true,
    },
  });
});
it('sends the delivery method', async () => {
  const { driver, fetch } = setup();

  await driver({ url: '/api', method: 'POST' });

  expect(fetch).toBeCalledWith('/api', {
    headers: [['Content-Type', 'application/json']],
    method: 'POST',
  });
});
it('sends data with the request', async () => {
  const { driver, fetch } = setup();

  await driver({ url: '/api', method: 'POST', data: { someFlag: true } });

  expect(fetch).toBeCalledWith('/api', {
    headers: [['Content-Type', 'application/json']],
    method: 'POST',
    body: JSON.stringify({ someFlag: true }),
  });
});
it('adds data to the url query param', async () => {
  const { driver, fetch } = setup();

  await driver({ url: '/api', data: { 'some param': 'yes & no' } });

  expect(fetch).toBeCalledWith('/api?some+param=yes+%26+no', {
    headers: [['Content-Type', 'application/json']],
    method: 'GET',
  });
});
it('injects url params', async () => {
  const { driver, fetch } = setup();

  await driver({ url: '/api/{userId}', params: { userId: 'yo&yo' } });

  expect(fetch).toBeCalledWith('/api/yo%26yo', {
    headers: [['Content-Type', 'application/json']],
    method: 'GET',
  });
});
it('appends headers', async () => {
  const { driver, fetch } = setup();

  await driver({ url: '/api', headers: { Authorization: '1234' } });

  expect(fetch).toBeCalledWith('/api', {
    headers: [
      ['Content-Type', 'application/json'],
      ['Authorization', '1234'],
    ],
    method: 'GET',
  });
});

describe('when response fails', () => {
  it('rejects with the status and error json', async () => {
    const { driver, response } = setup();
    response.ok = false;
    response.status = 500;

    const promise = driver({ url: '/api' });

    await expect(promise).rejects.toThrow(new UnknownError());
  });
  it('rejects with the status and error text', async () => {
    const { driver, response } = setup();
    response.ok = false;
    response.status = 500;
    response.headers.get.mockReturnValue('text/plain');

    const promise = driver({ url: '/api' });

    await expect(promise).rejects.toEqual(new UnknownError());
  });
});
