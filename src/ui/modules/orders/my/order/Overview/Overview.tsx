import React, { ReactNode } from 'react';
import { makeGameListingPath, makeUserPath } from 'ui/constants/paths';
import { LinkButton } from 'ui/elements/Button';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import { colorMatrix, iconMatrix } from 'ui/modules/listings/utils';
import Photo from 'ui/elements/Photo';
import { FaUser } from 'react-icons/fa';
import type { Order } from '@sns/contracts/order';
import type { Listing } from '@sns/contracts/listing';

const Unknown = () => null;

interface Props {
  order: Order;
  listing: Listing;
  history: ReactNode;
  actions: ReactNode;
  help: ReactNode;
}

export default function Overview({
  actions,
  history,
  help,
  listing: {
    id: listingId,
    productIds: [productId],
    username: seller,
    images,
  },
  order: { id: orderId, status },
}: Props) {
  const getMessage = useGetMessage();
  const Icon = iconMatrix[status] ?? Unknown;
  const color = colorMatrix[status];
  const image = Object.values(images)[0];

  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-8">
        <div className="aspect aspect-16-9 sm:w-1/2 sm:mx-auto lg:mx-0 lg:w-1/3">
          <Photo src={image} className="object-cover" />
        </div>
        <div className="space-y-8 flex-grow">
          <div className="space-y-8 sm:flex sm:space-y-0 lg:flex-grow">
            <div className="sm:w-1/2">
              <h3 className="font-semibold">
                {getMessage(ids.order.myOrder.order)}
              </h3>
              <div className="text-sm">{orderId}</div>
            </div>
            <div className="sm:w-1/2">
              <h3 className="font-semibold">
                {getMessage(ids.order.myOrder.listing)}
              </h3>
              <LinkButton
                to={makeGameListingPath({
                  listingId,
                  productId,
                })}
                className="text-sm inline-flex"
              >
                {listingId}
              </LinkButton>
            </div>
          </div>
          <div className="space-y-8 sm:flex sm:space-y-0">
            <div className="sm:w-1/2">
              <h3 className="font-semibold">
                {getMessage(ids.listings.myListing.status.label)}
              </h3>
              <div className="text-sm flex items-center space-x-4">
                <span className={color}>
                  <Icon size="1em" />
                </span>
                <span>
                  {getMessage(
                    ids.order.status[status] ?? ids.order.status.open,
                  )}
                </span>
              </div>
            </div>
            <div className="sm:w-1/2">
              <h3 className="font-semibold">
                {getMessage(ids.listings.myListing.seller.label)}
              </h3>
              <LinkButton
                to={makeUserPath({ username: seller })}
                className="inline-flex space-x-2"
              >
                <FaUser className="text-xs" />
                <span className="text-sm">{seller}</span>
              </LinkButton>
            </div>
          </div>
        </div>
      </div>
      <div className="help">{help}</div>
      <div>{actions}</div>
      {history}
    </div>
  );
}
