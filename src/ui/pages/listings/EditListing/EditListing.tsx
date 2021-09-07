import React from 'react';
import PageTitle from 'ui/elements/PageTitle';
import { useGetMessage, useMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import Form from 'ui/modules/listings/new/Form';
import {
  GAMES,
  makeGameListingPath,
  makeGamePath,
  makeMyListingPath,
} from 'ui/constants/paths';
import { Link } from 'react-router-dom';
import type useMachine from 'ui/modules/listings/new/machine';
import type { Query } from '@respite/core';
import type { Discount } from '@sns/contracts/listing';

type Step = ReturnType<typeof useMachine>[0];
type Dispatch = ReturnType<typeof useMachine>[1];

interface Props {
  productId: string;
  listingId: string;
  name: string;
  step: Step;
  dispatch: Dispatch;
  username: string;
  location: string;
  requirementsQuery: Query<{
    images: Array<{
      key: string;
      required: boolean;
    }>;
  }>;
  discountQuery: Query<Discount>;
  error: any;
}

export default function EditListing({
  productId,
  listingId,
  name,
  step,
  dispatch,
  username,
  location,
  requirementsQuery,
  discountQuery,
  error,
}: Props) {
  const getMessage = useGetMessage();

  return (
    <div className="flex-grow flex flex-col relative">
      <PageTitle>
        <Link to={GAMES}>{getMessage(ids.games.title)}</Link>
        <Link to={makeGamePath({ productId })}>{name}</Link>
        <Link to={makeGameListingPath({ listingId, productId })}>
          {listingId}
        </Link>
        <span>{useMessage(ids.listings.edit.title)}</span>
      </PageTitle>
      <Form
        error={error}
        dispatch={dispatch}
        location={location}
        previousUrl={makeMyListingPath({ listingId })}
        productId={productId}
        step={step}
        username={username}
        requirementsQuery={requirementsQuery}
        discountQuery={discountQuery}
      />
    </div>
  );
}
