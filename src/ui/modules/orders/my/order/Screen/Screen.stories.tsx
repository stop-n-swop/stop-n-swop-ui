/* eslint-disable react/jsx-no-literals */
import { Order, Status } from '@sns/contracts/order';
import React from 'react';
import { Status as ActionStatus } from '@respite/core';
import { Provider as Intl } from 'ui/intl';
import { en } from 'ui/messages';
import { BrowserRouter } from 'react-router-dom';
import History from 'ui/modules/listings/my/listing/History';
import type { Listing } from '@sns/contracts/listing';
import Overview from '../Overview';
import Actions from '../Actions';
import Screen from './Screen';
import type { Game } from '@sns/contracts/product';
import Help from '../Help';

export default {
  title: 'modules / orders / my / order / Screen',
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
  const listing = {
    id: 'listing-id',
    username: 'seller-id',
    productIds: ['product-id'],
  } as Listing;
  const order = {
    id: 'order-id',
    listingId: listing.id,
    username: 'buyer-id',
    status,
  } as Order;
  const game = {
    name: 'Super Mario World',
  } as Game;

  return (
    <Intl messages={en}>
      <BrowserRouter>
        <Screen
          error={null}
          game={game}
          overview={
            <Overview
              listing={listing}
              order={order}
              help={<Help status={status} />}
              history={
                <History
                  createdDate={new Date()}
                  username="test"
                  historyQuery={{ data: [] } as any}
                />
              }
              actions={
                <Actions
                  onClick={() => null}
                  order={order}
                  status={ActionStatus.IDLE}
                />
              }
            />
          }
        />
      </BrowserRouter>
    </Intl>
  );
};
Basic.args = basicProps;
