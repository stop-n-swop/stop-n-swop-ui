import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import useMachine from 'ui/modules/listings/new/machine';
import type { Values } from 'ui/modules/listings/new/types';
import { useAuthGuard } from 'usecases/auth';
import NewProductListing from './NewProductListing';

export default function ConnectedNewProductListing() {
  useAuthGuard({ username: true });
  const { productId } = useParams<{ productId: string }>();
  const onSubmit = async (values: Values) => {
    // eslint-disable-next-line no-console
    console.log(values);
    return new Promise((res) => {
      setTimeout(res, 2000);
    });
  };
  const formProps = useForm<Values>();
  const [step, dispatch] = useMachine('condition', { onSubmit });
  const name = 'Super Mario 64';

  return (
    <FormProvider {...formProps}>
      <NewProductListing
        productId={productId}
        dispatch={dispatch}
        step={step}
        name={name}
        location="London, UK"
        username="seller1337"
      />
    </FormProvider>
  );
}
