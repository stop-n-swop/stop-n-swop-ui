/* eslint-disable react/jsx-no-literals */
import React from 'react';
import { Provider as Intl } from 'ui/intl';
import { en } from 'ui/messages';
import { BrowserRouter } from 'react-router-dom';
import { Order, Status } from '@sns/contracts/order';
import { Status as ActionStatus, Provider as Respite } from '@respite/core';
import { Provider as Jpex } from 'react-jpex';
import type { Config } from 'core/io';
import Screen from './Screen';
import Overview from '../Overview';
import Actions from '../Actions';
import type { Game } from '@sns/contracts/product';
import type { Listing } from '@sns/contracts/listing';
import BuyerAddress from '../BuyerAddress';
import type { useAddress } from 'application/listings';
import Help from '../Help';
import type { User } from '@sns/contracts/user';
import History from '../History';

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
  manualApproval: boolean;
}
const basicProps: BasicProps = {
  orderStatus: Status.OPEN,
  manualApproval: false,
};
export const Basic = ({ orderStatus, manualApproval }: BasicProps) => {
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
    images: {
      example:
        'http://www.boxmygames.com/wp-content/uploads/2015/07/Mario-Kart-64-2.jpg',
    },
  } as unknown as Listing;
  const order: Order = {
    id: 'order_id',
    listingId: listing.id,
    status: orderStatus,
    created:
      orderStatus !== Status.OPEN && orderStatus !== Status.CLOSED
        ? new Date()
        : null,
  } as Order;
  const user: User = {
    username: 'stoppy',
    address: null,
    clientEmail: 'stop@swop.com',
    email: 'stop@swop.com',
    verified: true,
    preferences: {
      manualApproval,
      noticeEmails: false,
    },
    created: new Date(),
  };

  return (
    <Jpex
      onMount={(jpex) => {
        jpex.constant<Config>({
          images: {
            url: '',
          },
        } as any);
      }}
    >
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
                  placedAt={order.created}
                  help={
                    <Help status={orderStatus} canApprove={manualApproval} />
                  }
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
                  history={
                    <History
                      createdDate={new Date()}
                      username="test"
                      historyQuery={
                        {
                          data: [
                            {
                              date: new Date(),
                              listingId: '',
                              orderId: '',
                              username: 'test',
                              status: Status.APPROVED,
                            },
                          ],
                        } as any
                      }
                    />
                  }
                  actions={
                    <Actions
                      onChangeStatus={alert}
                      listing={listing}
                      orders={[order]}
                      user={user}
                      status={ActionStatus.IDLE}
                    />
                  }
                />
              }
            />
          </BrowserRouter>
        </Intl>
      </Respite>
    </Jpex>
  );
};
Basic.args = basicProps;
