import React, { CSSProperties } from 'react';
import { ListingsItem, Actions } from 'ui/modules/listings/listings';
import Purchase from 'ui/modules/listings/Purchase';
import { getDisplayPrice, Listing as IListing } from '@sns/contracts/listing';

interface Props {
  owned: boolean;
  listing: IListing;
  style: CSSProperties;
}

export default function Listing({
  listing,
  listing: {
    productIds: [productId],
    id: listingId,
    username,
    images,
    location,
    rating,
    stats,
    postage,
    currency,
    status,
  },
  style,
  owned,
}: Props) {
  return (
    <ListingsItem
      username={username}
      image={Object.values(images)[0]}
      rating={rating}
      location={location}
      stats={stats}
      style={style}
    >
      <Actions
        listingId={listingId}
        price={getDisplayPrice(listing)}
        productId={productId}
        currency={currency}
        postage={postage}
        addToBasket={
          <Purchase
            listingId={listingId}
            className="text-sm"
            listingStatus={status}
            owned={owned}
          />
        }
      />
    </ListingsItem>
  );
}
