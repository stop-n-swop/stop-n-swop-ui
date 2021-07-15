import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import useMachine, { firstStep } from 'ui/modules/listings/new/machine';
import { useAuthGuard } from 'application/auth';
import { useRequirements } from 'application/listings';
import { useGame } from 'application/games';
import { useUser } from 'application/user';
import { useCreateListing } from 'application/listings/useCreateListing';
import { CountryISO } from 'domain/constants';
import type { Values } from 'ui/modules/listings/new/types';
import NewProductListing from './NewProductListing';
import { useOnSubmit } from './utils';

export default function ConnectedNewProductListing() {
  useAuthGuard({ username: true, address: true, details: true });
  const { productId, platformId } =
    useParams<{
      productId: string;
      platformId: string;
    }>();
  const {
    data: { name },
  } = useGame({ id: productId });
  const requirementsQuery = useRequirements({ productId, platformId });
  const {
    data: {
      username,
      address: { city, country },
    },
  } = useUser();
  const { action: create, error } = useCreateListing();
  const { push } = useHistory();
  const onSubmit = useOnSubmit({ create, productId, platformId, push });
  const formProps = useForm<Values>({
    defaultValues: {
      postage: 0,
    },
  });
  const [step, dispatch] = useMachine(firstStep, { onSubmit });

  const location = `${city}, ${CountryISO[country] ?? country}`;

  return (
    <FormProvider {...formProps}>
      <NewProductListing
        productId={productId}
        platformId={platformId}
        dispatch={dispatch}
        step={step}
        name={name}
        location={location}
        username={username}
        requirementsQuery={requirementsQuery}
        error={error}
      />
    </FormProvider>
  );
}
