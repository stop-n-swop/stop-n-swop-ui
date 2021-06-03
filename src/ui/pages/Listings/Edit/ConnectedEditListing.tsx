import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import useMachine, { firstStep } from 'ui/modules/listings/new/machine';
import { useAuthGuard } from 'application/auth';
import { useRequirements } from 'application/listings';
import { useMyListing } from 'application/listings/useMyListing';
import { useGame } from 'application/games';
import type { Values } from 'ui/modules/listings/new/types';
import EditListing from './EditListing';
import { getDefaultValues, useOnSubmit, useRedirectOnDone } from './utils';

export default function ConnectedEditListing() {
  useAuthGuard();
  const { productId, listingId, platformId } =
    useParams<{
      productId: string;
      listingId: string;
      platformId: string;
    }>();
  const { data: game } = useGame({ id: productId });
  const { data: listing } = useMyListing({ id: listingId });
  const requirementsQuery = useRequirements({ productId, platformId });

  const onSubmit = useOnSubmit({ listingId, platformId, productId });

  const [step, dispatch] = useMachine(firstStep, { onSubmit });
  const formProps = useForm<Values>({
    defaultValues: getDefaultValues(listing),
  });

  useRedirectOnDone({ step, listingId });

  return (
    <FormProvider {...formProps}>
      <EditListing
        listingId={listingId}
        productId={productId}
        platformId={platformId}
        dispatch={dispatch}
        step={step}
        name={game.name}
        location={listing.location}
        username={listing.username}
        requirementsQuery={requirementsQuery}
      />
    </FormProvider>
  );
}
