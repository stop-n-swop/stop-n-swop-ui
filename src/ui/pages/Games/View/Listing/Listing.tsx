import React, { CSSProperties } from 'react';
import { ListingsItem, Actions } from 'ui/modules/listings/listings';
import type { Stats } from '@sns/contracts/listing';

interface Props {
  productId: string;
  listingId: string;
  platformId: string;
  username: string;
  image: string;
  price: number;
  rating: number;
  location: string;
  stats: Stats;
  style: CSSProperties;
}

export default function Listing({
  productId,
  listingId,
  platformId,
  username,
  style,
  image,
  location,
  price,
  rating,
  stats,
}: Props) {
  return (
    <ListingsItem
      username={username}
      image={image}
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
      />
    </ListingsItem>
  );
}
