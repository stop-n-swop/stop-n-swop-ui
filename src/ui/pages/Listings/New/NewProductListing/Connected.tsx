import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import useMachine from 'ui/modules/listings/new/machine';
import NewProductListing from './NewProductListing';

export default function Connected() {
  const { productId } = useParams<{ productId: string }>();
  const onSubmit = async (values: unknown) => {
    console.log(values);
    return new Promise((res) => {
      setTimeout(res, 2000);
    });
  };
  const formProps = useForm({
    shouldUnregister: false,
    defaultValues: {
      price: null,
    },
  });
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
