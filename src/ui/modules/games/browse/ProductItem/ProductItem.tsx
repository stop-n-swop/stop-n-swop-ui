import React, { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import Favourite from 'ui/modules/product/Favourite';
import cx from 'classnames';
import { makeGamePath } from 'ui/constants/paths';
import { GridItem } from 'ui/elements/grid';
import { useMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import { GiRetroController } from 'react-icons/gi';
import type { Game, Platform } from '@sns/contracts/product';

interface Props {
  game: Game;
  platform: Platform;
  totalListings: number;
  favourite: boolean;
  onFavouriteClick(): void;
  style?: CSSProperties;
}

export default function ProductItem({
  game: { id, name, cover, banner },
  platform: { name: platformName },
  style,
  totalListings,
  favourite,
  onFavouriteClick,
}: Props) {
  return (
    <GridItem
      component={Link}
      to={makeGamePath({ productId: id })}
      style={style}
    >
      <div className="w-1/4 md:w-full flex-shrink-0 relative md:pb-2/3">
        <Choose>
          <When condition={Boolean(cover || banner)}>
            <img
              className="object-contain sm:object-cover object-center w-full h-full md:absolute hover:bg-opacity-50"
              src={cover || banner}
              alt="cover"
              loading="lazy"
            />
          </When>
          <Otherwise>
            <div className="w-full h-full md:absolute bg-gray-500 flex justify-center items-center">
              <GiRetroController size="4rem" />
            </div>
          </Otherwise>
        </Choose>
      </div>
      <div className="hidden md:block px-2">{name}</div>
      <div className="flex-grow flex md:px-2">
        <div className="flex flex-col flex-grow justify-between space-y-3 py-3">
          <div className="md:hidden">{name}</div>
          <div className="text-xs">{platformName}</div>
          <div
            className={cx(
              'text-xs',
              totalListings > 0 ? 'text-primary-lightest' : 'text-gray-500',
            )}
          >
            {useMessage(ids.games.search.results.available, {
              count: totalListings,
            })}
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <span style={{ fontSize: '2rem' }}>
            <Favourite
              key="favourite"
              value={favourite}
              onClick={onFavouriteClick}
            />
          </span>
        </div>
      </div>
    </GridItem>
  );
}
