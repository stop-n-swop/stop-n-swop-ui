import React, { CSSProperties, useState } from 'react';
import type { Platform, Game } from '@sns/contracts/product';
import ProductItem from 'ui/modules/games/browse/ProductItem';

export default function Item({
  style,
  game,
  platform,
}: {
  game: Game;
  platform: Platform;
  style?: CSSProperties;
}) {
  const [favourite, setFavourite] = useState(false);
  const totalListings = 0;

  return (
    <ProductItem
      game={game}
      favourite={favourite}
      onFavouriteClick={() => setFavourite(!favourite)}
      platform={platform}
      totalListings={totalListings}
      style={style}
    />
  );
}
