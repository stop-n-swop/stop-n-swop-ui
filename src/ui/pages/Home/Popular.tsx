import React from 'react';
import { useGames } from 'application/games';
import Thumb from 'ui/modules/home/common/reel/Thumb';
import useReel from 'ui/modules/home/common/reel/useReel';
import Block from 'ui/modules/home/common/Block';
import BlockHeading from 'ui/modules/home/common/BlockHeading';
import Reel from 'ui/modules/home/common/reel/Reel';
import { useMessage } from 'ui/intl';
import { ids } from 'ui/messages';

export default function Popular() {
  const {
    data: { games },
  } = useGames({
    available: false,
    favourites: false,
    group: true,
    page: 0,
    platforms: [],
    search: 'zelda',
  });
  const { size } = useReel();

  return (
    <Block className="px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12">
      <BlockHeading>{useMessage(ids.home.listings.popular)}</BlockHeading>
      <Reel>
        {games.slice(0, size).map((game) => {
          return (
            <Thumb
              key={game.id}
              image={game.cover}
              label={<span className="text-xs">{game.name}</span>}
            />
          );
        })}
      </Reel>
    </Block>
  );
}
