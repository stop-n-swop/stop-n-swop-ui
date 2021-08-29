/* eslint-disable react/jsx-no-literals */
import React from 'react';
import { useMessage, Provider } from '.';

export default {
  title: 'intl',
  decorators: [
    (Story) => (
      <Provider
        messages={{
          basic: 'hello world',
          values: 'hello {name}',
          plurals:
            'There {countA === 1 ? "is one thing" : "are " + countA + "things"}, and {countB} other {countB === 1 ? "thing" : "things"}',
          reactValues: 'Here is a {link}',
          elementValues: 'Here is a <a>link</a>',
        }}
      >
        <Story />
      </Provider>
    ),
  ],
};

export const Basic = () => {
  return <div>{useMessage('basic')}</div>;
};

export const Values = () => {
  return <div>{useMessage('values', { name: 'Jack' })}</div>;
};

export const Plurals = () => {
  return <div>{useMessage('plurals', { countA: 1, countB: 2 })}</div>;
};

export const ReactValues = () => {
  return <div>{useMessage('reactValues', { link: <a href="/">link</a> })}</div>;
};

export const ElementValues = () => {
  return (
    <div>
      {useMessage('elementValues', {
        link: ({ children }) => <a href="/">{children}</a>,
      })}
    </div>
  );
};
