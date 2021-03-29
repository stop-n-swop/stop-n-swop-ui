import React, { CSSProperties } from 'react';
import cx from 'classnames';
import { ListItem } from 'ui/elements/list';
import { Stats } from 'core/entity/listings';
import { ImageUrl } from 'core/types';
import Image from './Image';
import SellerInfo from './SellerInfo';
import Statistics from '../Stats';
import Actions from './Actions';

interface Props {
  productId: string;
  listingId: string;
  username: string;
  image: ImageUrl;
  style: CSSProperties;
  price: number;
  stats: Stats;
  rating: number;
  location: string;
  readonly?: boolean;
}

export default function ListingsListItem({
  productId,
  listingId,
  username,
  image,
  style,
  price,
  stats,
  rating,
  location,
  readonly,
}: Props) {
  return (
    <ListItem style={style}>
      <div className={cx('flex space-x-4 w-full h-full')}>
        <Image image={image} />

        <div className="flex-grow flex flex-col sm:flex-row overflow-x-hidden">
          <div className="flex flex-col flex-grow justify-between space-y-3 pt-6 md:pb-6">
            <SellerInfo username={username} rating={rating} />
            <div className="hidden md:block text-xs italic text-gray-300">
              {location}
            </div>
            <div className="hidden md:block w-80 xl:w-full">
              <Statistics stats={stats} />
            </div>
          </div>
          <Actions
            productId={productId}
            listingId={listingId}
            price={price}
            readonly={readonly}
          />
        </div>
      </div>
    </ListItem>
  );
}
