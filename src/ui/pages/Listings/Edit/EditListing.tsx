import React from 'react';
import PageTitle from 'ui/elements/PageTitle';
import { useMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import Form from 'ui/modules/listings/new/Form';
import { makeViewMyListingPath } from 'ui/constants/paths';
import type useMachine from 'ui/modules/listings/new/machine';
import type { Query } from '@respite/core';

type Step = ReturnType<typeof useMachine>[0];
type Dispatch = ReturnType<typeof useMachine>[1];

interface Props {
  productId: string;
  platformId: string;
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
}

export default function NewProductListing({
  productId,
  platformId,
  listingId,
  name,
  step,
  dispatch,
  username,
  location,
  requirementsQuery,
}: Props) {
  return (
    <div className="flex-grow flex flex-col relative">
      <PageTitle>
        {useMessage(ids.listings.edit.title, { name, listingId })}
      </PageTitle>
      <Form
        error={null}
        dispatch={dispatch}
        location={location}
        previousUrl={makeViewMyListingPath({ listingId })}
        productId={productId}
        platformId={platformId}
        step={step}
        username={username}
        requirementsQuery={requirementsQuery}
      />
    </div>
  );
}
