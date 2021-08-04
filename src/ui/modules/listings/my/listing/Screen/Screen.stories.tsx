/* eslint-disable react/jsx-no-literals */
import React from 'react';
import { Provider as Intl } from 'ui/intl';
import { en } from 'ui/messages';
import { BrowserRouter } from 'react-router-dom';
import { Order, Status } from '@sns/contracts/order';
import { Status as ActionStatus, Provider as Respite } from '@respite/core';
import Screen from './Screen';
import Overview from '../Overview';
import Actions from '../Actions';
import type { Game } from '@sns/contracts/product';
import type { Listing } from '@sns/contracts/listing';
import BuyerAddress from '../BuyerAddress';
import type { useAddress } from 'application/listings';
import Help from '../Help';

export default {
  title: 'modules / listings / my / listing / Screen',
  argTypes: {
    orderStatus: {
      control: 'select',
      options: Object.values(Status),
    },
  },
};

interface BasicProps {
  orderStatus: Status;
}
const basicProps: BasicProps = {
  orderStatus: Status.OPEN,
};
export const Basic = ({ orderStatus }: BasicProps) => {
  const game: Game = {
    id: 'supermario64',
    name: 'Super Mario 64',
  } as Game;
  const listing: Listing = {
    id: 'listing_id',
    price: 20000,
    postage: 200,
    currency: 'GBP',
    status: orderStatus,
  } as Listing;
  const order: Order = {
    id: 'order_id',
    listingId: listing.id,
    status: orderStatus,
  } as Order;

  return (
    <Respite>
      <Intl messages={en}>
        <BrowserRouter>
          <Screen
            error={null}
            game={game}
            overview={
              <Overview
                buyer="buyer_id"
                listingId={listing.id}
                listing={listing}
                orderId={order.id}
                productId={game.id}
                status={orderStatus}
                help={<Help status={orderStatus} />}
                buyerAddress={
                  <BuyerAddress
                    status={orderStatus}
                    addressQuery={
                      {
                        data: {
                          name: 'Mr Customer',
                          address: {
                            line1: 'line 1',
                            line2: 'line 2',
                            city: 'city',
                            postcode: 'PS57 C0D3',
                            country: 'GB',
                          },
                        },
                      } as ReturnType<typeof useAddress>
                    }
                  />
                }
                history={<div>history</div>}
                actions={
                  <Actions
                    onChangeStatus={alert}
                    listing={listing}
                    orders={[order]}
                    status={ActionStatus.IDLE}
                  />
                }
              />
            }
          />
        </BrowserRouter>
      </Intl>
    </Respite>
  );
};
Basic.args = basicProps;
