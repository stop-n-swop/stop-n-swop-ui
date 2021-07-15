import { Status as OrderStatus } from '@sns/contracts/order';
import React from 'react';
import { Provider as Intl } from 'ui/intl';
import { en } from 'ui/messages';
import Status from './Status';

export default {
  title: 'modules / listings / my / listing / Status',
  argTypes: {
    status: {
      control: 'select',
      options: Object.values(OrderStatus),
    },
  },
};

interface BasicProps {
  status: OrderStatus;
}
const basicProps: BasicProps = { status: OrderStatus.OPEN };

export const Basic = ({ status }: BasicProps) => {
  return (
    <Intl messages={en}>
      <Status status={status} />
    </Intl>
  );
};
Basic.args = basicProps;
