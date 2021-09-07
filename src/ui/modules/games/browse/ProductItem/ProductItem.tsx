import React, { CSSProperties, ReactNode, useState } from 'react';
import type { Game, Platform as IPlatform } from '@sns/contracts/product';
import PlatformModal from './PlatformModal';
import Item from './Item';
import Cover from './Cover';
import Listings from './Listings';
import Platform from './Platform';

interface Props {
  game: Game;
  platforms: IPlatform[];
  listingCounts: Record<string, number>;
  favourite: ReactNode;
  style?: CSSProperties;
}

export default function ProductItem({
  game,
  platforms,
  style,
  listingCounts,
  favourite,
}: Props) {
  const [showPlatforms, setShowPlatforms] = useState(false);

  return (
    <>
      <Item
        id={game.id}
        platforms={platforms}
        setShowPlatforms={setShowPlatforms}
        style={style}
      >
        <Cover game={game} />
        <div className="hidden md:block px-2">{game.name}</div>
        <div className="flex-grow flex md:px-2">
          <div className="flex flex-col flex-grow justify-end space-y-3 py-3">
            <div className="md:hidden">{game.name}</div>
            <Platform platforms={platforms} />
            <Listings
              game={game}
              listingCounts={listingCounts}
              platforms={platforms}
            />
          </div>
          <div className="flex flex-col justify-center">
            <span style={{ fontSize: '2rem' }}>{favourite}</span>
          </div>
        </div>
      </Item>
      <PlatformModal
        game={game}
        listingCounts={listingCounts}
        platforms={platforms}
        setShowPlatforms={setShowPlatforms}
        showPlatforms={showPlatforms}
      />
    </>
  );
}
