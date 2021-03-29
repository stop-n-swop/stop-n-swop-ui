import React from 'react';
import Card from 'ui/elements/Card';
import PageTitle from 'ui/elements/PageTitle';
import { useFormContext } from 'react-hook-form';
import Loader from 'react-spinners/BeatLoader';
import useMachine from 'ui/modules/listings/new/machine';
import Condition from 'ui/modules/listings/new/Condition';
import Features from 'ui/modules/listings/new/Features';
import Region from 'ui/modules/listings/new/Region';
import Price from 'ui/modules/listings/new/Price';
import Description from 'ui/modules/listings/new/Description';
import Photos from 'ui/modules/listings/new/Photos';
import Review from 'ui/modules/listings/new/Review';
import Done from 'ui/modules/listings/new/Done';
import { Values } from 'ui/modules/listings/new/types';
import Tracker from 'ui/modules/listings/new/Tracker/Tracker';
import { FormattedMessage } from 'react-intl';
import { ids } from 'ui/messages';

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
  const onPrevious = () => dispatch('previous');
  const { handleSubmit } = useFormContext<Values>();

  return (
    <div className="flex-grow flex flex-col relative">
      <PageTitle>
        <FormattedMessage
          id={ids.listings.new.productPageTitle}
          values={{ name }}
        />
      </PageTitle>
      <Card
        padding={false}
        className="lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:transform w-full xl:w-4/5"
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
              <Condition />
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
              <Photos previous={onPrevious} />
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
                <Loader color="#FFF" />
              </div>
            </When>
            <When condition={step === 'done'}>
              <Done />
            </When>
            <Otherwise>{step}</Otherwise>
          </Choose>
        </form>
      </Card>
    </div>
  );
}
