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
  const { listingId } =
    useParams<{
      listingId: string;
    }>();
  const { data: listing } = useMyListing({ id: listingId });
  const { data: game } = useGame({ id: listing.productIds[0] });
  const requirementsQuery = useRequirements({
    productId: game.id,
    platformId: game.platformId,
  });

  const [onSubmit, error] = useOnSubmit({ listingId, productId: game.id });

  const [step, dispatch] = useMachine(firstStep, { onSubmit });
  const formProps = useForm<Values>({
    defaultValues: getDefaultValues(listing),
  });

  useRedirectOnDone({ step, listingId });

  return (
    <FormProvider {...formProps}>
      <EditListing
        listingId={listingId}
        productId={game.id}
        platformId={game.platformId}
        dispatch={dispatch}
        step={step}
        name={game.name}
        location={listing.location}
        username={listing.username}
        requirementsQuery={requirementsQuery}
        error={error}
      />
    </FormProvider>
  );
}
