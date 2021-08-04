import React, { CSSProperties, ReactNode } from 'react';
import cx from 'classnames';
import { ListItem } from 'ui/elements/list';
import type { Stats } from '@sns/contracts/listing';
import type { ImageUrl } from 'domain/types';
import Image from './Image';
import SellerInfo from './SellerInfo';
import Statistics from '../Stats';

interface Props {
  username: string;
  image: ImageUrl;
  style: CSSProperties;
  stats: Stats;
  rating: number;
  location: string;
  children: ReactNode;
}

export default function ListingsListItem({
  username,
  image,
  style,
  stats,
  rating,
  location,
  children,
}: Props) {
  return (
    <ListItem style={style}>
      <div className={cx('flex space-x-4 w-full h-full')}>
        <Image image={image} />

        <div className="flex-grow flex-shrink-0 flex flex-col sm:flex-row overflow-x-hidden">
          <div className="flex flex-col flex-grow justify-between space-y-3 md:pt-6 md:pb-6">
            <SellerInfo username={username} rating={rating} />
            <div className="hidden md:block text-xs italic text-gray-300">
              {location}
            </div>
            <div className="hidden md:block">
              <Statistics stats={stats} />
            </div>
          </div>
          {children}
        </div>
      </div>
    </ListItem>
  );
}
