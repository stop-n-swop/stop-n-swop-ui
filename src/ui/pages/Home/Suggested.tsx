import React, { Suspense } from 'react';
import { useGetCurrency, useMessage } from 'ui/intl';
import { Status } from '@sns/contracts/order';
import { useListings } from 'application/listings';
import { useGame } from 'application/games';
import Block from 'ui/modules/home/common/Block';
import Reel from 'ui/modules/home/common/reel/Reel';
import BlockHeading from 'ui/modules/home/common/BlockHeading';
import Thumb from 'ui/modules/home/common/reel/Thumb';
import useReel from 'ui/modules/home/common/reel/useReel';
import { ids } from 'ui/messages';
import Loader from 'ui/modules/Loader';
import type { Listing } from '@sns/contracts/listing';

const Item = ({
  listing,
  getCurrency,
}: {
  listing: Listing;
  getCurrency: ReturnType<typeof useGetCurrency>;
}) => {
  const { data: game } = useGame({ id: listing.productIds[0] });
  const image = Object.values(listing.images)[0];

  return (
    <Thumb
      image={image}
      label={
        <>
          <div className="text-xs">{game.name}</div>
          <div className="text-sm font-semibold">
            {getCurrency(listing.price, { currency: listing.currency })}
          </div>
        </>
      }
    />
  );
};

export default function Suggested() {
  const getCurrency = useGetCurrency();
  const { data: listings } = useListings({ status: Status.OPEN });
  const { page, items } = useReel(listings);

  return (
    <Block className="px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12">
      <BlockHeading>{useMessage(ids.home.listings.suggested)}</BlockHeading>
      <Reel
        page={page}
        items={items}
        render={(listing) => (
          <Suspense key={listing.id} fallback={<Loader />}>
            <Item
              key={listing.id}
              getCurrency={getCurrency}
              listing={listing}
            />
          </Suspense>
        )}
      />
    </Block>
  );
}
