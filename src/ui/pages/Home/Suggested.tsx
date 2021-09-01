import React, { Suspense } from 'react';
import { useGetCurrency, useGetMessage } from 'ui/intl';
import { useSuggestions } from 'application/listings';
import { useGame } from 'application/games';
import Block from 'ui/modules/home/common/Block';
import Reel from 'ui/modules/home/common/reel/Reel';
import BlockHeading from 'ui/modules/home/common/BlockHeading';
import Thumb from 'ui/modules/home/common/reel/Thumb';
import useReel from 'ui/modules/home/common/reel/useReel';
import { ids } from 'ui/messages';
import Loader from 'ui/modules/Loader';
import { makeGameListingPath } from 'ui/constants/paths';
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
      to={makeGameListingPath({
        productId: listing.productIds[0],
        listingId: listing.id,
      })}
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
  const getMessage = useGetMessage();
  const getCurrency = useGetCurrency();
  const { data: listings } = useSuggestions();
  const { page, items, size } = useReel(listings);

  if (items.length < size) {
    return null;
  }

  return (
    <Block className="px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12">
      <BlockHeading>{getMessage(ids.home.listings.suggested)}</BlockHeading>
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
