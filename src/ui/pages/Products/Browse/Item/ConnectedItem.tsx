import React, { CSSProperties, useState } from 'react';
import cover from 'ui/assets/Super_Mario_64_Boxart.png';
import banner from 'ui/assets/sc8e2l.jpg';
import { Platform, Product } from 'core/entity/products';
import Item from './Item';

export default function ConnectedItem({
  productId,
  style,
}: {
  productId: string;
  style?: CSSProperties;
}) {
  const [favourite, setFavourite] = useState(false);
  const product: Product = {
    productId,
    banner,
    cover,
    developer: 'Nintendo',
    publisher: 'Nintendo',
    name: 'Super Mario 64',
    platformId: 'n64',
    type: 'game',
    releaseDate: new Date(new Date('1996-06-23')),
  };
  const platform: Platform = {
    productId: 'n64',
    platformId: 'n64',
    name: 'Nintendo 64',
    banner: '',
    cover: '',
    developer: '',
    publisher: '',
    releaseDate: new Date(),
    type: 'platform',
  };
  const totalListings = 6;

  return (
    <Item
      favourite={favourite}
      toggleFavourite={() => setFavourite(!favourite)}
      name={product.name}
      image={product.cover}
      platform={platform.name}
      productId={productId}
      style={style}
      totalListings={totalListings}
    />
  );
}
