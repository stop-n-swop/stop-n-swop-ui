import { useAuthGuard } from 'application/auth';
import { useGame } from 'application/games';
import React from 'react';
import PageTitle from 'ui/elements/PageTitle';
import { Link, useParams } from 'react-router-dom';
import { useGetMessage } from 'ui/intl';
import { NEW_LISTING } from 'ui/constants/paths';
import { ids } from 'ui/messages';
import Card from 'ui/elements/Card';
import Tracker from 'ui/modules/listings/new/Tracker/Tracker';
import Done from 'ui/modules/listings/new/Done';
import { FaCheckCircle } from 'react-icons/fa';

export default function NewListingCompete() {
  useAuthGuard();
  const { productId, listingId } =
    useParams<{
      productId: string;
      listingId: string;
    }>();
  const {
    data: { name },
  } = useGame({ id: productId });
  const getMessage = useGetMessage();

  return (
    <div className="flex-grow flex flex-col relative">
      <PageTitle>
        <Link to={NEW_LISTING}>{getMessage(ids.listings.new.pageTitle)}</Link>
        <span>{name}</span>
      </PageTitle>
      <Card
        title={
          <div className="flex space-x-8 items-center">
            <FaCheckCircle className="text-primary-light" size="3rem" />
            <span>{getMessage(ids.listings.new.done.title)}</span>
          </div>
        }
        padding={false}
        className="w-full max-w-screen-lg mx-auto lg:my-8 xl:my-12"
      >
        <div className="p-6">
          <Tracker step="done" />
          <Done listingId={listingId} productId={productId} />
        </div>
      </Card>
    </div>
  );
}
