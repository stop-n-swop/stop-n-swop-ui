import React, { CSSProperties, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { makeProductNewListingPath } from 'ui/constants/paths';
import { GridItem } from 'ui/elements/grid';
import { ImageUrl } from 'core/types';

interface Props {
  productId: string;
  name: ReactNode;
  image: ImageUrl;
  platform: string;
  style?: CSSProperties;
}

export default function ProductItem({
  productId,
  name,
  image,
  style,
  platform,
}: Props) {
  return (
    <GridItem
      component={Link}
      to={makeProductNewListingPath({ productId })}
      style={style}
    >
      <div className="w-1/4 md:w-full flex-shrink-0 relative md:pb-2/3">
        <div
          className="bg-cover w-full h-full md:absolute hover:bg-opacity-50"
          style={{ backgroundImage: `url(${image})` }}
        />
      </div>
      <div className="hidden md:block px-2">{name}</div>
      <div className="flex-grow flex md:px-2">
        <div className="flex flex-col flex-grow justify-between space-y-3 py-3">
          <div className="md:hidden">{name}</div>
          <div className="text-xs">{platform}</div>
        </div>
      </div>
    </GridItem>
  );
}
