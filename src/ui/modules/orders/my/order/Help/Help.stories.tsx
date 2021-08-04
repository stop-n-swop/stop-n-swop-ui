/* eslint-disable react/jsx-no-literals */
import { Status } from '@sns/contracts/order';
import React from 'react';
import { Provider as Intl } from 'ui/intl';
import { en } from 'ui/messages';
import { BrowserRouter } from 'react-router-dom';
import Help from './Help';

export default {
  title: 'modules / orders / my / order / Help',
  argTypes: {
    status: {
      control: 'select',
      options: Object.values(Status),
    },
  },
};

interface BasicProps {
  status: Status;
}
const basicProps: BasicProps = { status: Status.CREATED };

export const Basic = ({ status }: BasicProps) => {
  return (
    <Intl messages={en}>
      <BrowserRouter>
        <div className="help">
          <Help status={status} />
        </div>
      </BrowserRouter>
    </Intl>
  );
};
Basic.args = basicProps;
