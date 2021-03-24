import { Product } from 'core/entity/products';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import banner from 'ui/assets/sc8e2l.jpg';
import cover from 'ui/assets/Super_Mario_64_Boxart.png';
import View from './View';

export default function ConectedViewPage() {
  const [favourite, setFavourite] = useState(false);
  const { productId } = useParams<{ productId: string }>();
  const listingIds = new Array(10).fill(null).map((_, i) => `${i}`);

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

  return (
    <View
      banner={product.banner}
      cover={product.cover}
      developer={product.developer}
      publisher={product.developer}
      name={product.name}
      releaseDate={product.releaseDate}
      favourite={favourite}
      toggleFavourite={() => setFavourite(!favourite)}
      listingIds={listingIds}
      productId={productId}
    />
  );
}
