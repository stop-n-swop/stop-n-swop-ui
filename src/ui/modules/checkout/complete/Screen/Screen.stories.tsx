import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider as Intl } from 'ui/intl';
import { en } from 'ui/messages';
import CompleteScreen from './Screen';

export default {
  title: 'modules / checkout / complete / Screen',
};

export const Basic = () => {
  return (
    <Intl messages={en}>
      <BrowserRouter>
        <CompleteScreen orderId="1234" />
      </BrowserRouter>
    </Intl>
  );
};
