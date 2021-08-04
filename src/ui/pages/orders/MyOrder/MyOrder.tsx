import { useAuthGuard } from 'application/auth';
import { useGame } from 'application/games';
import { useListing } from 'application/listings';
import { useHistory, useChangeStatus, useMyOrder } from 'application/orders';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { MY_ORDERS } from 'ui/constants/paths';
import PageTitle from 'ui/elements/PageTitle';
import { useMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import History from 'ui/modules/listings/my/listing/History';
import Actions from 'ui/modules/orders/my/order/Actions';
import Help from 'ui/modules/orders/my/order/Help';
import Overview from 'ui/modules/orders/my/order/Overview';
import Screen from 'ui/modules/orders/my/order/Screen';

export default function MyOrder() {
  useAuthGuard();
  const { orderId } = useParams<{ orderId: string }>();
  const { data: order } = useMyOrder({ id: orderId });
  const { data: listing } = useListing({ id: order.listingId });
  const { data: game } = useGame({ id: listing.productIds[0] });
  const historyQuery = useHistory({ orderId });
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
        <span>{orderId}</span>
      </PageTitle>
      <Screen
        error={error}
        game={game}
        overview={
          <Overview
            listing={listing}
            order={order}
            help={<Help status={order.status} />}
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
                historyQuery={historyQuery}
              />
            }
          />
        }
      />
    </div>
  );
}
