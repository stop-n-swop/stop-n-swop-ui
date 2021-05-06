import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGame } from 'usecases/games';
import { usePlatform } from 'usecases/platforms';
import View from './View';

export default function ConectedViewPage() {
  const [favourite, setFavourite] = useState(false);
  const { productId, platformId } = useParams<{
    productId: string;
    platformId: string;
  }>();
  const { data: game } = useGame({ id: productId });
  const { data: platform } = usePlatform({ id: platformId });
  const { releaseDate } = game.platforms.find(({ id }) => id === platformId);
  const listingIds = new Array(10).fill(null).map((_, i) => `${i}`);

  return (
    <View
      banner={game.banner}
      cover={game.cover}
      developer={game.developers[0]}
      publisher={game.publishers[0]}
      name={game.name}
      releaseDate={releaseDate}
      favourite={favourite}
      toggleFavourite={() => setFavourite(!favourite)}
      listingIds={listingIds}
      productId={productId}
      platformId={platformId}
      platform={platform.name}
    />
  );
}
