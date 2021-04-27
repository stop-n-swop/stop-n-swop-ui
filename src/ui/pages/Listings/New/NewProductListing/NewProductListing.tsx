import React from 'react';
import PageTitle from 'ui/elements/PageTitle';
import type useMachine from 'ui/modules/listings/new/machine';
import { useMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import Form from 'ui/modules/listings/new/Form';
import { NEW_LISTING } from 'ui/constants/paths';

type Step = ReturnType<typeof useMachine>[0];
type Dispatch = ReturnType<typeof useMachine>[1];

interface Props {
  productId: string;
  name: string;
  step: Step;
  dispatch: Dispatch;
  username: string;
  location: string;
}

export default function NewProductListing({
  productId,
  name,
  step,
  dispatch,
  username,
  location,
}: Props) {
  return (
    <div className="flex-grow flex flex-col relative">
      <PageTitle>
        {useMessage(ids.listings.new.productPageTitle, { name })}
      </PageTitle>
      <Form
        dispatch={dispatch}
        location={location}
        previousUrl={NEW_LISTING}
        productId={productId}
        step={step}
        username={username}
      />
    </div>
  );
}
