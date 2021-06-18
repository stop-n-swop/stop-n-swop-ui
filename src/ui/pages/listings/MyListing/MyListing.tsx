import React, { useEffect } from 'react';
import Card from 'ui/elements/Card';
import PageTitle from 'ui/elements/PageTitle';
import Overview from 'ui/modules/listings/my/listing/Overview';
import Actions from 'ui/modules/listings/my/listings/Actions';
import History from 'ui/modules/listings/my/listing/History';
import { useAuthGuard } from 'application/auth';
import { useMyListing } from 'application/listings/useMyListing';
import { useGame } from 'application/games';
import { Link, useParams } from 'react-router-dom';
import { useHistory } from 'application/listings';
import { useChangeStatus, useListingOrders } from 'application/orders';
import FormError from 'ui/elements/FormError';
import { MY_LISTINGS } from 'ui/constants/paths';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';

export default function MyListing() {
  useAuthGuard();
  const getMessage = useGetMessage();
  const { listingId } = useParams<{ listingId: string }>();

  const { data: listing, invalidate: invalidateListing } = useMyListing({
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
  const { data: history, invalidate: invalidateHistory } = useHistory({
    listingId,
  });
  const { data: orders, invalidate: invalidateOrders } = useListingOrders({
    listingId,
  });
  const {
    action: changeStatus,
    status: actionStatus,
    error,
  } = useChangeStatus();

  // TODO: would be good to make this a respite native
  useEffect(() => {
    const handle = setInterval(() => {
      invalidateListing();
      invalidateHistory();
      invalidateOrders();
    }, 10000);

    return () => clearInterval(handle);
  }, [invalidateHistory, invalidateListing, invalidateOrders]);

  const orderId = orders.length > 1 ? undefined : orders[0]?.id;
  const buyer = orders.length > 1 ? undefined : orders[0]?.username;

  return (
    <div>
      <PageTitle>
        <Link to={MY_LISTINGS}>
          {getMessage(ids.listings.myListings.title)}
        </Link>
        <span>{game.name}</span>
      </PageTitle>
      <Card className="md:mt-3 lg:mt-4 xl:mt-8 xl:w-4/5 xl:mx-auto flex flex-col space-y-8">
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
              onChangeStatus={changeStatus}
            />
          }
          history={
            <History
              username={username}
              createdDate={createdDate}
              history={history}
            />
          }
        />
      </Card>
    </div>
  );
}
