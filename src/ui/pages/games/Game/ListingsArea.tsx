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
      priceRange: [null, null],
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
      minPrice: values.priceRange[0],
      maxPrice: values.priceRange[1] === Infinity ? null : values.priceRange[1],
    };
  }, [
    productId,
    values.condition,
    values.features,
    values.priceRange,
    values.rating,
    values.region,
  ]);
  const listingsQuery = useListings(args);
  const loggedIn = useIsLoggedIn();
  const userQuery = useUser();
  const user = loggedIn ? userQuery.data : null;

  return (
    <div className="flex flex-col lg:flex-row flex-grow">
      <FormProvider {...formProps}>
        <Filters />
      </FormProvider>
      <ErrorBoundary
        FallbackComponent={Error}
        onReset={listingsQuery.invalidate}
      >
        <Suspense
          fallback={
            <div className="flex-grow">
              <LoadingPage />
            </div>
          }
        >
          <Listings
            listingsQuery={listingsQuery}
            user={user}
            productId={productId}
          />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
