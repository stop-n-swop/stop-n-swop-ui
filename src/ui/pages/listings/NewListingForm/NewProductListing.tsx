import React from 'react';
import PageTitle from 'ui/elements/PageTitle';
import { useMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import Form from 'ui/modules/listings/new/Form';
import { makeNewListingPlatformPath, NEW_LISTING } from 'ui/constants/paths';
import { Link } from 'react-router-dom';
import type useMachine from 'ui/modules/listings/new/machine';
import type { Query } from '@respite/core';

type Step = ReturnType<typeof useMachine>[0];
type Dispatch = ReturnType<typeof useMachine>[1];

interface Props {
  productId: string;
  platformId: string;
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
  error: any;
}

export default function NewProductListing({
  productId,
  platformId,
  name,
  step,
  dispatch,
  username,
  location,
  requirementsQuery,
  error,
}: Props) {
  return (
    <div className="flex-grow flex flex-col relative">
      <PageTitle>
        <Link to={NEW_LISTING}>{useMessage(ids.listings.new.pageTitle)}</Link>
        <Link to={makeNewListingPlatformPath({ platformId })}>
          {platformId}
        </Link>
        <span>{name}</span>
      </PageTitle>
      <Form
        dispatch={dispatch}
        location={location}
        previousUrl={NEW_LISTING}
        productId={productId}
        step={step}
        username={username}
        requirementsQuery={requirementsQuery}
        error={error}
      />
    </div>
  );
}
