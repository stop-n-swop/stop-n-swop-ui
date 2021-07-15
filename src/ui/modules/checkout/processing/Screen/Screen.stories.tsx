import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider as Intl } from 'ui/intl';
import { en } from 'ui/messages';
import Screen from './Screen';

export default {
  title: 'modules / checkout / processing / Screen',
};

export const Basic = () => (
  <Intl messages={en}>
    <BrowserRouter>
      <Screen />
    </BrowserRouter>
  </Intl>
);
