import React, { CSSProperties, useState } from 'react';
import cover from 'ui/assets/Super_Mario_64_Boxart.png';
import banner from 'ui/assets/sc8e2l.jpg';
import { Platform, Game, Type } from '@sns/contracts/product';
import Item from './Item';

export default function ConnectedItem({
  productId,
  style,
}: {
  productId: string;
  style?: CSSProperties;
}) {
  const [favourite, setFavourite] = useState(false);
  const product: Game = {
    productId,
    banner,
    cover,
    developer: 'Nintendo',
    publisher: 'Nintendo',
    name: 'Super Mario 64',
    platformId: 'n64',
    type: Type.GAME,
    releaseDate: new Date(new Date('1996-06-23')),
  };
  const platform: Platform = {
    productId: 'n64',
    name: 'Nintendo 64',
    banner: '',
    cover: '',
    releaseDate: new Date(),
    type: Type.PLATFORM,
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
