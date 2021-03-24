import React from 'react';
import { useCascade } from 'ui/hooks';
import { ListingsList } from 'ui/modules/listings/listings';
import Overview from 'ui/modules/product/view/Overview';
import QuickActions from 'ui/modules/product/view/QuickActions';
import Filters from 'ui/modules/listings/browse/Filters';
import { ImageUrl } from 'core/types';
import Listing from '../Listing';

export default function View({
  name,
  developer,
  publisher,
  releaseDate,
  cover,
  banner,
  productId,
  listingIds,
  favourite,
  toggleFavourite,
}: {
  name: string;
  cover: ImageUrl;
  banner: ImageUrl;
  developer: string;
  publisher: string;
  releaseDate: Date;
  productId: string;
  listingIds: string[];
  favourite: boolean;
  toggleFavourite(): void;
}) {
  const cascade = useCascade(10);

  return (
    <div className="xl:w-4/5 xl:mx-auto flex-grow flex flex-col">
      <Overview
        banner={banner}
        cover={cover}
        developer={developer}
        publisher={publisher}
        name={name}
        releaseDate={releaseDate}
      />
      <QuickActions
        favourite={favourite}
        onFavouriteClick={toggleFavourite}
        onCollectClick={() => null}
      />
      <div className="flex flex-col lg:flex-row flex-grow lg:space-x-4">
        <Filters />
        <ListingsList>
          {listingIds.map((listingId, i) => (
            <Listing
              style={cascade(i)}
              productId={productId}
              listingId={listingId}
            />
          ))}
        </ListingsList>
      </div>
    </div>
  );
}
