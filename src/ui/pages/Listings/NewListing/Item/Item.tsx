import React, { CSSProperties } from 'react';
import { ListableProductItem as ProductItem } from 'ui/modules/product/products';
import { ImageUrl } from 'core/types';

export default function Item({
  productId,
  name,
  image,
  platform,
  style,
}: {
  productId: string;
  name: string;
  image: ImageUrl;
  platform: string;
  style?: CSSProperties;
}) {
  return (
    <ProductItem
      productId={productId}
      name={name}
      image={image}
      style={style}
      platform={platform}
    />
  );
}
