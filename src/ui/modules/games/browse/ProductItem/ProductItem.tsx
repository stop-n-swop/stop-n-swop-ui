import React, { CSSProperties, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import Favourite from 'ui/modules/product/Favourite';
import cx from 'classnames';
import { makeGamePath } from 'ui/constants/paths';
import { GridItem } from 'ui/elements/grid';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import { GiRetroController } from 'react-icons/gi';
import { LinkButton } from 'ui/elements/Button';
import type { Game, Platform } from '@sns/contracts/product';

interface Props {
  game: Game;
  platforms: Platform[];
  listingCounts: Record<string, number>;
  favourite: boolean;
  onFavouriteClick(): void;
  style?: CSSProperties;
}

export default function ProductItem({
  game: { id, gameId, name, cover, banner },
  platforms,
  style,
  listingCounts,
  favourite,
  onFavouriteClick,
}: Props) {
  const g = useGetMessage();
  const hasManyPlatforms = platforms.length > 1;
  const [showPlatforms, setShowPlatforms] = useState(false);
  const totalListings = hasManyPlatforms
    ? platforms.reduce((acc, platform) => {
        const id = `${platform.id}-${gameId}`;
        const count = listingCounts[id] ?? 0;
        return acc + count;
      }, 0)
    : listingCounts[id] ?? 0;

  const GridItemComponent = useCallback(
    ({ className, ...props }: Record<string, any>) => {
      if (hasManyPlatforms) {
        return (
          <button
            type="button"
            className={cx(className, 'appearance-none text-left')}
            style={{ alignItems: 'unset' }}
            {...props}
            onClick={() => setShowPlatforms(!showPlatforms)}
          />
        );
      }
      return (
        <Link
          {...props}
          className={className}
          to={makeGamePath({ productId: id })}
        />
      );
    },
    [hasManyPlatforms, id, showPlatforms],
  );

  return (
    <GridItem component={GridItemComponent} style={style}>
      <div className="w-1/4 md:w-full flex-shrink-0 relative md:pb-2/3">
        <Choose>
          <When condition={Boolean(cover || banner)}>
            <img
              className="object-cover sm:object-cover object-center w-full h-full md:absolute hover:bg-opacity-50"
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
        <div className="flex flex-col flex-grow justify-end space-y-3 py-3">
          <div className="md:hidden">{name}</div>
          <div className="text-xs">
            <Choose>
              <When condition={showPlatforms}>
                {platforms.map((platform) => {
                  const productId = `${platform.id}-${gameId}`;
                  const count = listingCounts[productId] ?? 0;

                  return (
                    <LinkButton
                      key={productId}
                      to={makeGamePath({ productId })}
                      padding
                      className={cx(
                        'rounded-t-none rounded-b-none first:rounded-t last:rounded-b',
                        'border-b-2 last:border-b-0',
                        count > 0
                          ? 'border-primary-dark'
                          : 'border-secondary-darker',
                      )}
                      kind={count > 0 ? 'primary' : 'secondary'}
                    >
                      <div className="text-center">
                        <div>{platform.name}</div>
                        <div>
                          {g(ids.games.search.results.available, {
                            count,
                          })}
                        </div>
                      </div>
                    </LinkButton>
                  );
                })}
              </When>
              <When condition={hasManyPlatforms}>
                <span>
                  {g(ids.games.search.results.platformAvailable, {
                    count: platforms.length,
                  })}
                </span>
              </When>
              <Otherwise>
                <span>{platforms[0]?.name}</span>
              </Otherwise>
            </Choose>
          </div>
          <If condition={!showPlatforms}>
            <div
              className={cx(
                'text-xs',
                totalListings > 0 ? 'text-primary-lightest' : 'text-gray-500',
              )}
            >
              {g(ids.games.search.results.available, {
                count: totalListings,
              })}
            </div>
          </If>
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
