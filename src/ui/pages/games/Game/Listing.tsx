import React, { CSSProperties } from 'react';
import { ListingsItem, Actions } from 'ui/modules/listings/listings';
import AddToBasket from 'ui/modules/listings/AddToBasket';
import type { Listing as IListing } from '@sns/contracts/listing';
import type { Status } from '@respite/core';

interface Props {
  owned: boolean;
  listing: IListing;
  style: CSSProperties;
  inBasket: boolean;
  addToBasketStatus: Status;
  onAddToBasket({ listingId: string }): Promise<void>;
}

export default function Listing({
  listing: {
    productIds: [productId],
    id: listingId,
    username,
    images,
    location,
    price,
    rating,
    stats,
    postage,
    currency,
    status,
  },
  addToBasketStatus,
  onAddToBasket,
  inBasket,
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
        price={price}
        productId={productId}
        currency={currency}
        postage={postage}
        addToBasket={
          <AddToBasket
            listingId={listingId}
            className="text-sm"
            inBasket={inBasket}
            addStatus={addToBasketStatus}
            onAddToBasket={onAddToBasket}
            listingStatus={status}
            owned={owned}
          />
        }
      />
    </ListingsItem>
  );
}
