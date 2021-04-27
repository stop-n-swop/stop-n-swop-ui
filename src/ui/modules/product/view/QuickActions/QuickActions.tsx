import React from 'react';
import { FaMoneyBillWave, FaPlus } from 'react-icons/fa';
import { useGetMessage } from 'ui/intl';
import { Link } from 'react-router-dom';
import { animated } from 'react-spring';
import { makeProductNewListingPath } from 'ui/constants/paths';
import Button from 'ui/elements/Button';
import { useBoop } from 'ui/hooks';
import { ids } from 'ui/messages';
import Favourite from 'ui/modules/product/Favourite';

const ListIcon = animated(FaMoneyBillWave);
const CollectionIcon = animated(FaPlus);

interface Props {
  favourite: boolean;
  onFavouriteClick(): void;
  onCollectClick(): void;
}

export default function QuickActions({
  favourite,
  onFavouriteClick,
  onCollectClick,
}: Props) {
  const [listStyle, listBoop] = useBoop({ rotation: 20, x: 4 });
  const [collectionStyle, collectionBoop] = useBoop({ rotation: 90 });
  const getMessage = useGetMessage();

  return (
    <div
      className="flex justify-around"
      style={{ backdropFilter: 'brightness(0.5)' }}
    >
      <Favourite
        value={favourite}
        onClick={onFavouriteClick}
        className="w-full justify-center"
      >
        <span className="hidden md:block text-xs ml-3">
          {getMessage(ids.products.actions.favourite)}
        </span>
      </Favourite>
      <Button
        className="w-full justify-center"
        component={Link}
        to={makeProductNewListingPath({ productId: 'super_mario_64' })}
        onMouseEnter={listBoop}
      >
        <ListIcon style={listStyle} size="1em" />
        <span className="hidden md:block text-xs ml-3">
          {getMessage(ids.products.actions.list)}
        </span>
      </Button>
      <Button
        className="w-full justify-center"
        onMouseEnter={collectionBoop}
        onClick={onCollectClick}
      >
        <CollectionIcon style={collectionStyle} size="1em" />
        <span className="hidden md:block text-xs ml-3">
          {getMessage(ids.products.actions.collect)}
        </span>
      </Button>
    </div>
  );
}
