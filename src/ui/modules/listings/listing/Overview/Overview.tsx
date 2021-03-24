import React from 'react';
import { FaQuestionCircle } from 'react-icons/fa';
import Button from 'ui/elements/Button';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import { Link } from 'react-router-dom';
import { makeUserPath } from 'ui/constants/paths';
import StarRating from 'ui/modules/listings/listings/StarRating';
import Card from 'ui/elements/Card';
import { ids } from 'ui/messages';
import AddToBasket from '../AddToBasket';

export default function Overview({
  className,
  name,
  productId,
  listingId,
  username,
  location,
  description,
}: {
  className: string;
  name: string;
  productId: string;
  listingId: string;
  username: string;
  location: string;
  description: string;
}) {
  const listingText = `(${listingId})`;

  return (
    <Card className={className}>
      <h2 className="text-center">
        <span className="font-logo pr-3">{name}</span>
        <span className="text-sm text-gray-300">{listingText}</span>
      </h2>
      <div className="flex justify-between items-center">
        <span className="text-lg">
          <FormattedNumber value={50} style="currency" currency="GBP" />
        </span>
        <AddToBasket productId={productId} listingId={listingId} />
      </div>
      <div>
        <h3>
          <FormattedMessage id={ids.listings.listing.seller} />
        </h3>
        <div className="flex flex-col sm:flex-row sm:space-x-6 sm:items-center">
          <div className="flex items-center text-sm">
            <Button
              padding={false}
              component={Link}
              to={makeUserPath({ userId: username })}
              className="text-gray-300 mr-4"
            >
              {username}
            </Button>
            <StarRating rating={3.5} />
            <Button kind="tertiary">
              <FaQuestionCircle className="text-sm" />
            </Button>
          </div>
          <div className="text-sm text-gray-300">{location}</div>
        </div>
      </div>
      <div>
        <h3>
          <FormattedMessage id={ids.listings.listing.description} />
        </h3>
        <pre className="font-display whitespace-pre-wrap my-4">
          {description}
        </pre>
      </div>
    </Card>
  );
}
