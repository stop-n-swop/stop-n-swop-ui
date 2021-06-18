import { useAuthGuard } from 'application/auth';
import { useGame } from 'application/games';
import { useListing } from 'application/listings';
import { useHistory, useChangeStatus, useMyOrder } from 'application/orders';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { MY_ORDERS } from 'ui/constants/paths';
import Card from 'ui/elements/Card';
import FormError from 'ui/elements/FormError';
import PageTitle from 'ui/elements/PageTitle';
import { useMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import History from 'ui/modules/listings/my/listing/History';
import Actions from 'ui/modules/orders/my/order/Actions';
import Overview from 'ui/modules/orders/my/order/Overview/Overview';

export default function MyOrder() {
  useAuthGuard();
  const { orderId } = useParams<{ orderId: string }>();
  const { data: order } = useMyOrder({ id: orderId });
  const { data: listing } = useListing({ id: order.listingId });
  const { data: game } = useGame({ id: listing.productIds[0] });
  const { data: history } = useHistory({ orderId });
  const {
    action: changeStatus,
    status: actionStatus,
    error,
  } = useChangeStatus();

  const { username, createdDate } = listing;

  return (
    <div>
      <PageTitle>
        <Link to={MY_ORDERS}>{useMessage(ids.order.myOrders.title)}</Link>
        <span>{game.name}</span>
      </PageTitle>
      <Card className="md:mt-3 lg:mt-4 xl:mg-8 xl:w-4/5 xl:mx-auto flex flex-col">
        <If condition={error}>
          <FormError error={error} />
        </If>
        <Overview
          listing={listing}
          order={order}
          actions={
            <Actions
              order={order}
              status={actionStatus}
              onClick={(status) =>
                changeStatus({
                  orderId,
                  status,
                })
              }
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
