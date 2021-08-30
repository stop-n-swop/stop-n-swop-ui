import React, { Suspense } from 'react';
import { usePopularGames } from 'application/games';
import Thumb from 'ui/modules/home/common/reel/Thumb';
import useReel from 'ui/modules/home/common/reel/useReel';
import Block from 'ui/modules/home/common/Block';
import BlockHeading from 'ui/modules/home/common/BlockHeading';
import Reel from 'ui/modules/home/common/reel/Reel';
import { useMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import Loader from 'ui/modules/Loader';
import { makeGamePath } from 'ui/constants/paths';

export default function Popular() {
  const { data: games } = usePopularGames();
  const { items, page } = useReel(games);

  return (
    <Block className="px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12">
      <BlockHeading>{useMessage(ids.home.listings.popular)}</BlockHeading>
      <Reel
        page={page}
        items={items}
        render={(game) => (
          <Suspense key={game.id} fallback={<Loader />}>
            <Thumb
              to={makeGamePath({ productId: game.id })}
              image={game.cover}
              label={<span className="text-xs">{game.name}</span>}
            />
          </Suspense>
        )}
      />
    </Block>
  );
}
