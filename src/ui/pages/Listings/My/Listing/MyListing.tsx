import { Status, Order } from '@sns/contracts/order';
import React from 'react';
import Card from 'ui/elements/Card';
import PageTitle from 'ui/elements/PageTitle';
import Slideshow from 'ui/elements/Slideshow';
import Overview from 'ui/modules/listings/my/listing/Overview';
import { Status as RStatus } from '@respite/core';
import Actions from 'ui/modules/listings/my/listings/Actions';
import { useAuthGuard } from 'application/auth';
import { useMyListing } from 'application/listings/useMyListing';
import { useGame } from 'application/games';
import { useParams } from 'react-router-dom';

export default function MyListing() {
  useAuthGuard();
  const { listingId } = useParams<{ listingId: string }>();

  const { data: listing } = useMyListing({ id: listingId });

  const {
    products: [{ productId, platformId }],
    username,
    images,
    createdDate,
  } = listing;
  const listingText = `(${listingId})`;
  const { data: game } = useGame({
    id: productId,
  });
  const order: Order = null;
  const history = [];
  const status = order?.status ?? Status.NONE;

  return (
    <div>
      <PageTitle>
        <span className="pr-6">{game.name}</span>
        <span className="text-xs text-gray-500">{listingText}</span>
      </PageTitle>
      <Card className="md:mt-3 lg:mt-4 xl:mt-8 xl:w-4/5 xl:mx-auto flex flex-col">
        <div className="lg:flex">
          <Slideshow images={Object.values(images)} className="lg:w-1/2 mb-4" />
          <Overview
            history={history}
            listingId={listingId}
            platformId={platformId}
            productId={productId}
            status={status}
            seller={username}
            buyer={order?.username}
            createdDate={createdDate}
            actions={
              <Actions
                listing={listing}
                order={order}
                status={RStatus.IDLE}
                onClick={() => null}
              />
            }
          />
        </div>
      </Card>
    </div>
  );
}
