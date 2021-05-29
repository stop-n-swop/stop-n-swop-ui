import React from 'react';
import { useCascade } from 'ui/hooks';
import { ListingsList } from 'ui/modules/listings/listings';
import { useAddToBasket, useBasket } from 'application/basket';
import { isInBasket } from 'domain/selectors/basket';
import Listing from './Listing';
import type { Query } from '@respite/core';
import type { Listing as IListing } from '@sns/contracts/listing';

interface Props {
  listingsQuery: Query<IListing[]>;
}

export default function Listings({ listingsQuery: { data: listings } }: Props) {
  const cascade = useCascade(listings.length);
  const { data: basket } = useBasket();
  const { action: addToBasket, status } = useAddToBasket();

  return (
    <ListingsList>
      {listings.map((listing, i) => (
        <Listing
          key={listing.id}
          style={cascade(i)}
          listing={listing}
          addToBasketStatus={status}
          onAddToBasket={addToBasket}
          inBasket={isInBasket(listing.id, basket)}
        />
      ))}
    </ListingsList>
  );
}
