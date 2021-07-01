import React from 'react';
import Card from 'ui/elements/Card';
import { useFormContext } from 'react-hook-form';
import Loader from 'ui/modules/Loader';
import useMachine, { firstStep } from 'ui/modules/listings/new/machine';
import Condition from 'ui/modules/listings/new/Condition';
import Features from 'ui/modules/listings/new/Features';
import Region from 'ui/modules/listings/new/Region';
import Price from 'ui/modules/listings/new/Price';
import Description from 'ui/modules/listings/new/Description';
import Photos from 'ui/modules/listings/new/Photos';
import Review from 'ui/modules/listings/new/Review';
import Error from 'ui/modules/listings/new/Error';
import Tracker from 'ui/modules/listings/new/Tracker/Tracker';
import { useHistory } from 'react-router-dom';
import { useMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import type { Values } from 'ui/modules/listings/new/types';
import type { Query } from '@respite/core';

type Step = ReturnType<typeof useMachine>[0];
type Dispatch = ReturnType<typeof useMachine>[1];

interface Props {
  productId: string;
  step: Step;
  dispatch: Dispatch;
  username: string;
  location: string;
  previousUrl: string;
  requirementsQuery: Query<{
    images: Array<{
      key: string;
      required: boolean;
    }>;
  }>;
  error: any;
}

export default function Form({
  productId,
  step,
  dispatch,
  username,
  location,
  previousUrl,
  requirementsQuery,
  error,
}: Props) {
  const { handleSubmit } = useFormContext<Values>();
  const { push } = useHistory();
  const onPrevious = () => {
    if (step === firstStep) {
      push(previousUrl);
    } else {
      dispatch('previous');
    }
  };

  return (
    <Card
      title={useMessage(ids.listings.new[step]?.title)}
      padding={false}
      className="w-full xl:w-4/5 xl:mx-auto lg:my-8 xl:my-12"
    >
      <form
        className="p-6"
        onSubmit={handleSubmit((values) => {
          dispatch('next', values);
        })}
      >
        <Tracker step={step} />
        <Choose>
          <When condition={step === 'condition'}>
            <Condition previous={onPrevious} />
          </When>
          <When condition={step === 'features'}>
            <Features previous={onPrevious} />
          </When>
          <When condition={step === 'region'}>
            <Region previous={onPrevious} />
          </When>
          <When condition={step === 'price'}>
            <Price previous={onPrevious} productId={productId} />
          </When>
          <When condition={step === 'description'}>
            <Description previous={onPrevious} />
          </When>
          <When condition={step === 'photos'}>
            <Photos
              previous={onPrevious}
              requiredPhotos={requirementsQuery.data.images}
            />
          </When>
          <When condition={step === 'review'}>
            <Review
              location={location}
              username={username}
              previous={onPrevious}
            />
          </When>
          <When condition={step === 'submitting'}>
            <div className="text-center">
              <Loader />
            </div>
          </When>
          <When condition={step === 'error'}>
            <Error error={error} previous={onPrevious} />
          </When>
        </Choose>
      </form>
    </Card>
  );
}
