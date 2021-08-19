import { Status } from '@sns/contracts/order';
import { useIsLoggedIn } from 'application/auth';
import { useListings } from 'application/listings';
import { useUser } from 'application/user';
import React from 'react';
import { useParams } from 'react-router-dom';
import Overview from 'ui/modules/account/user/Overview';
import UserScreen from 'ui/modules/account/user/Screen';
import {
  Actions,
  ListingsItem,
  ListingsList,
} from 'ui/modules/listings/listings';
import Purchase from 'ui/modules/listings/Purchase';

export default function UserPage() {
  const { username } = useParams<{ username: string }>();
  const loggedIn = useIsLoggedIn();
  const currentUserQuery = useUser();
  const { data: user } = useUser({ username });
  const { data: listings } = useListings({
    username,
    status: Status.OPEN,
  });
  const completedListingsCount = useListings({
    username,
    status: Status.COMPLETE,
  }).data.length;

  return (
    <UserScreen
      username={user.username}
      overview={
        <Overview completedListingsCount={completedListingsCount} user={user} />
      }
      listings={
        <ListingsList>
          {listings.map((listing) => (
            <ListingsItem
              image={Object.values(listing.images)[0]}
              location={listing.location}
              rating={listing.rating}
              stats={listing.stats}
              username={listing.username}
              style={null}
            >
              <Actions
                currency={listing.currency}
                listingId={listing.id}
                productId={listing.productIds[0]}
                postage={listing.postage}
                price={listing.price}
                addToBasket={
                  <Purchase
                    listingId={listing.id}
                    listingStatus={listing.status}
                    owned={
                      loggedIn &&
                      currentUserQuery.data.username === listing.username
                    }
                  />
                }
              />
            </ListingsItem>
          ))}
        </ListingsList>
      }
    />
  );
}
