import React from 'react';
import PageTitle from 'ui/elements/PageTitle';
import type useMachine from 'ui/modules/listings/new/machine';
import { useMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import Form from 'ui/modules/listings/new/Form';
import { MY_LISTINGS } from 'ui/constants/paths';

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
}

export default function NewProductListing({
  productId,
  listingId,
  name,
  step,
  dispatch,
  username,
  location,
}: Props) {
  return (
    <div className="flex-grow flex flex-col relative">
      <PageTitle>
        {useMessage(ids.listings.edit.title, { name, listingId })}
      </PageTitle>
      <Form
        dispatch={dispatch}
        location={location}
        previousUrl={MY_LISTINGS}
        productId={productId}
        step={step}
        username={username}
      />
    </div>
  );
}
