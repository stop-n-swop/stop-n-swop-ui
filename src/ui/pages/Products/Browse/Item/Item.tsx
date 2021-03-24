import React, { CSSProperties } from 'react';
import { ProductItem } from 'ui/modules/product/products';
import { ImageUrl } from 'core/types';

export default function Item({
  productId,
  name,
  image,
  platform,
  totalListings,
  favourite,
  style,
  toggleFavourite,
}: {
  productId: string;
  name: string;
  image: ImageUrl;
  platform: string;
  totalListings: number;
  favourite: boolean;
  style?: CSSProperties;
  toggleFavourite(): void;
}) {
  return (
    <ProductItem
      productId={productId}
      name={name}
      image={image}
      style={style}
      platform={platform}
      totalListings={totalListings}
      favourite={favourite}
      onFavouriteClick={toggleFavourite}
    />
  );
}
