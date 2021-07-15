import React from 'react';
import Card from 'ui/elements/Card';
import PageTitle from 'ui/elements/PageTitle';
import Overview from 'ui/modules/listings/my/listing/Overview';
import Actions from 'ui/modules/listings/my/listing/Actions';
import History from 'ui/modules/listings/my/listing/History';
import BuyerAddress from 'ui/modules/listings/my/listing/BuyerAddress';
import { useAuthGuard } from 'application/auth';
import { useMyListing } from 'application/listings/useMyListing';
import { useGame } from 'application/games';
import { Link, useParams } from 'react-router-dom';
import {
  useHistory,
  useChangeStatus as useChangeListingStatus,
  useAddress,
} from 'application/listings';
import {
  useChangeStatus as useChangeOrderStatus,
  useListingOrders,
} from 'application/orders';

import FormError from 'ui/elements/FormError';
import { MY_LISTINGS } from 'ui/constants/paths';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import { Status } from '@respite/core';
import { Status as OrderStatus } from '@sns/contracts/order';

export default function MyListing() {
  useAuthGuard();
  const getMessage = useGetMessage();
  const { listingId } = useParams<{ listingId: string }>();

  const { data: listing } = useMyListing({
    id: listingId,
  });

  const {
    productIds: [productId],
    username,
    createdDate,
    status,
  } = listing;
  const { data: game } = useGame({
    id: productId,
  });
  const historyQuery = useHistory({
    listingId,
  });
  const { data: orders } = useListingOrders({
    listingId,
  });
  const addressQuery = useAddress({ listingId });
  const {
    action: changeOrderStatus,
    status: actionStatus1,
    error: error1,
  } = useChangeOrderStatus();
  const {
    action: changeListingStatus,
    status: actionStatus2,
    error: error2,
  } = useChangeListingStatus();

  // TODO: use combineActions
  const actionStatus =
    actionStatus1 === Status.IDLE ? actionStatus2 : actionStatus1;
  const error = error1 ?? error2;

  const orderId = orders.length > 1 ? undefined : orders[0]?.id;
  const buyer = orders.length > 1 ? undefined : orders[0]?.username;

  return (
    <div>
      <PageTitle>
        <Link to={MY_LISTINGS}>
          {getMessage(ids.listings.myListings.title)}
        </Link>
        <span>{listingId}</span>
      </PageTitle>
      <Card
        title={game.name}
        className="md:mt-3 lg:mt-4 xl:mt-8 xl:w-4/5 xl:mx-auto flex flex-col space-y-8"
      >
        <If condition={error}>
          <FormError error={error} />
        </If>
        <Overview
          listingId={listingId}
          productId={productId}
          orderId={orderId}
          status={status}
          buyer={buyer}
          actions={
            <Actions
              listing={listing}
              orders={orders}
              status={actionStatus}
              onChangeStatus={({ orderId, status }) => {
                if (
                  status === OrderStatus.OPEN ||
                  status === OrderStatus.CLOSED
                ) {
                  changeListingStatus({ status, id: listing.id });
                } else {
                  changeOrderStatus({ orderId, status });
                }
              }}
            />
          }
          history={
            <History
              username={username}
              createdDate={createdDate}
              historyQuery={historyQuery}
            />
          }
          buyerAddress={
            <BuyerAddress addressQuery={addressQuery} status={status} />
          }
        />
      </Card>
    </div>
  );
}
