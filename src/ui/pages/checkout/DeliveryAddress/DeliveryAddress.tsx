import { useAuthGuard } from 'application/auth';
import { useMyOrder, usePatchOrder } from 'application/orders';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Link, useHistory, useParams } from 'react-router-dom';
import Card from 'ui/elements/Card';
import FormError from 'ui/elements/FormError';
import Submit from 'ui/elements/Submit';
import AddressFields from 'ui/modules/account/about-me/Address/AddressFields';
import {
  makeBillingAddressPath,
  makeCheckoutPaymentPath,
} from 'ui/constants/paths';
import Button from 'ui/elements/Button';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import type { Address } from '@sns/contracts/user';

export default function DeliveryAddress() {
  useAuthGuard({ username: true });
  const getMessage = useGetMessage();
  const { orderId } = useParams<{ orderId: string }>();
  const {
    data: { deliveryAddress: address },
  } = useMyOrder({ id: orderId });
  const { action: patchOrder, error, reset, status } = usePatchOrder();
  const { push } = useHistory();

  const formProps = useForm({
    mode: 'onChange',
    defaultValues: { address },
  });
  const handleSubmit = async (values: { address: Address }) => {
    await patchOrder({
      orderId,
      deliveryAddress: values.address,
    });

    await new Promise((res) => setTimeout(res, 500));

    push(makeCheckoutPaymentPath({ orderId }));
  };

  return (
    <FormProvider {...formProps}>
      <form
        onSubmit={formProps.handleSubmit(handleSubmit)}
        className="flex-grow flex flex-col justify-center lg:items-center"
      >
        <Card
          className="flex-grow flex flex-col md:flex-grow-0 lg:w-2/3 xl:w-1/2"
          title={getMessage(ids.checkout.deliveryAddress.title)}
        >
          <p className="text-sm text-gray-100">
            {getMessage(ids.checkout.deliveryAddress.description)}
          </p>
          <FormError error={error} />
          <div className="space-y-8">
            <AddressFields address={address} />
            <div className="flex justify-around">
              <Button
                kind="tertiary"
                component={Link}
                to={makeBillingAddressPath({ orderId })}
              >
                {getMessage(ids.checkout.deliveryAddress.previous)}
              </Button>
              <Submit status={status} reset={reset}>
                {getMessage(ids.checkout.deliveryAddress.next)}
              </Submit>
            </div>
          </div>
        </Card>
      </form>
    </FormProvider>
  );
}
