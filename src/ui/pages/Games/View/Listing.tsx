import React, { CSSProperties } from 'react';
import { ListingsItem, Actions } from 'ui/modules/listings/listings';
import AddToBasket from 'ui/modules/listings/AddToBasket';
import type { Listing as IListing } from '@sns/contracts/listing';
import type { Status } from '@respite/core';

interface Props {
  listing: IListing;
  style: CSSProperties;
  inBasket: boolean;
  addToBasketStatus: Status;
  onAddToBasket({ listingId: string }): Promise<void>;
}

export default function Listing({
  listing: {
    products: [{ productId, platformId }],
    id: listingId,
    username,
    images,
    location,
    price,
    rating,
    stats,
    postage,
    currency,
  },
  addToBasketStatus,
  onAddToBasket,
  inBasket,
  style,
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
        price={price}
        productId={productId}
        platformId={platformId}
        currency={currency}
        postage={postage}
        addToBasket={
          <AddToBasket
            listingId={listingId}
            className="text-sm"
            inBasket={inBasket}
            status={addToBasketStatus}
            onAddToBasket={onAddToBasket}
          />
        }
      />
    </ListingsItem>
  );
}
