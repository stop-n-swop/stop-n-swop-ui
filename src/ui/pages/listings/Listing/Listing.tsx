import React from 'react';
import Slideshow from 'ui/elements/Slideshow';
import Overview from 'ui/modules/listings/listing/Overview';
import Features from 'ui/modules/listings/listing/Features';
import Card from 'ui/elements/Card';
import PageTitle from 'ui/elements/PageTitle';
import Purchase from 'ui/modules/listings/Purchase';
import { useListing } from 'application/listings';
import { useGame } from 'application/games';
import { useParams, Link } from 'react-router-dom';
import { useUser } from 'application/user';
import { useIsLoggedIn } from 'application/auth';
import { GAMES, makeGamePath } from 'ui/constants/paths';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';

export default function ListingPage() {
  const getMessage = useGetMessage();
  const { listingId, productId } =
    useParams<{
      productId: string;
      listingId: string;
      platformId: string;
    }>();

  const { data: listing } = useListing({ id: listingId });
  const { data: product } = useGame({ id: productId });

  const loggedIn = useIsLoggedIn();
  const userQuery = useUser();
  const user = loggedIn ? userQuery.data : null;

  const {
    images,
    description,
    username,
    rating,
    currency,
    postage,
    price,
    location,
    stats,
    status,
  } = listing;
  const { name: productName } = product;

  return (
    <div>
      <PageTitle>
        <Link to={GAMES}>{getMessage(ids.games.title)}</Link>
        <Link to={makeGamePath({ productId })}>{productName}</Link>
        <span>{listingId}</span>
      </PageTitle>
      <Card
        title={productName}
        className="md:mt-3 lg:mt-4 xl:mt-8 xl:w-4/5 xl:mx-auto flex flex-col"
        padding="p-3 lg:p-8 xl:pt-12 xl:px-0 xl:pb-0"
      >
        <div className="lg:flex">
          <Slideshow images={Object.values(images)} className="lg:w-1/2 mb-4" />
          <Overview
            className="space-y-8 lg:w-1/2 xl:w-auto"
            description={description}
            location={location}
            username={username}
            rating={rating}
            currency={currency}
            postage={postage}
            price={price}
            addToBasket={
              <Purchase
                listingId={listingId}
                owned={user?.username === username}
                listingStatus={status}
              />
            }
          />
        </div>
        <Features stats={stats} />
      </Card>
    </div>
  );
}
