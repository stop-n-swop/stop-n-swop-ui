import React, { Suspense, useMemo } from 'react';
import Filters from 'ui/modules/listings/browse/Filters';
import { useListings } from 'application/listings';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { ErrorBoundary } from 'react-error-boundary';
import Error from 'ui/modules/listings/listings/Error';
import LoadingPage from 'ui/pages/Loading';
import { useIsLoggedIn } from 'application/auth';
import { useUser } from 'application/user';
import type { Values } from 'ui/modules/listings/browse/types';
import Listings from './Listings';

interface Props {
  productId: string;
}

export default function ListingsArea({ productId }: Props) {
  const formProps = useForm<Values>({
    defaultValues: {
      condition: [],
      features: [],
      priceRanges: [],
      rating: 0,
      region: [],
    },
  });
  const values = useWatch<Values>({ control: formProps.control });
  const args = useMemo(() => {
    return {
      productId,
      boxed:
        values.features.includes('boxed') && values.features.includes('unboxed')
          ? null
          : values.features.includes('boxed') ||
            (values.features.includes('unboxed') ? false : null),
      condition: values.condition.length ? values.condition : null,
      instructions: values.features.includes('instructions') ? true : null,
      rating: values.rating ? values.rating : null,
      region: values.region.length ? values.region : null,
      minPrice: values.priceRanges.reduce(
        (min: number, [from]) => (min == null || from < min ? from : min),
        null,
      ),
      maxPrice: values.priceRanges.reduce(
        (max: number, [, to]) => (max == null || to > max ? to : max),
        null,
      ),
    };
  }, [
    productId,
    values.condition,
    values.features,
    values.priceRanges,
    values.rating,
    values.region,
  ]);
  const listingsQuery = useListings(args);
  const loggedIn = useIsLoggedIn();
  const userQuery = useUser();
  const user = loggedIn ? userQuery.data : null;

  return (
    <div className="flex flex-col lg:flex-row flex-grow lg:space-x-4">
      <FormProvider {...formProps}>
        <Filters />
      </FormProvider>
      <ErrorBoundary
        FallbackComponent={Error}
        onReset={listingsQuery.invalidate}
      >
        <Suspense fallback={<LoadingPage />}>
          <Listings listingsQuery={listingsQuery} user={user} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
