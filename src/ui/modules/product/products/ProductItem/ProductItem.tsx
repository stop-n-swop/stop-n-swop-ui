import React, { CSSProperties, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Favourite from 'ui/modules/product/Favourite';
import cx from 'classnames';
import { makeProductPath } from 'ui/constants/paths';
import { GridItem } from 'ui/elements/grid';
import { FormattedMessage } from 'react-intl';
import { ids } from 'ui/messages';
import { ImageUrl } from 'core/types';

interface Props {
  productId: string;
  name: ReactNode;
  image: ImageUrl;
  platform: string;
  totalListings: number;
  favourite: boolean;
  onFavouriteClick(): void;
  style?: CSSProperties;
}

export default function ProductItem({
  productId,
  name,
  image,
  style,
  platform,
  totalListings,
  favourite,
  onFavouriteClick,
}: Props) {
  return (
    <GridItem
      component={Link}
      to={makeProductPath({ productId })}
      style={style}
    >
      <div className="w-1/4 md:w-full flex-shrink-0 relative md:pb-2/3">
        <img
          className="object-cover w-full h-full md:absolute hover:bg-opacity-50"
          src={image}
          alt={image}
          loading="lazy"
        />
      </div>
      <div className="hidden md:block px-2">{name}</div>
      <div className="flex-grow flex md:px-2">
        <div className="flex flex-col flex-grow justify-between space-y-3 py-3">
          <div className="md:hidden">{name}</div>
          <div className="text-xs">{platform}</div>
          <div
            className={cx(
              'text-xs',
              totalListings > 0 ? 'text-green-50' : 'text-gray-500',
            )}
          >
            <FormattedMessage
              id={ids.products.search.results.available}
              values={{ count: totalListings }}
            />
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
