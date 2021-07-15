import { Status } from '@respite/core';
import { useAuthGuard } from 'application/auth';
import { useMyOrder, usePatchOrder } from 'application/orders';
import { useUpdateUser, useUser } from 'application/user';
import React from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import Card from 'ui/elements/Card';
import { Checkbox } from 'ui/elements/check';
import FormError from 'ui/elements/FormError';
import Submit from 'ui/elements/Submit';
import AddressFields from 'ui/modules/account/about-me/Address/AddressFields';
import {
  makeCheckoutPaymentPath,
  makeDeliveryAddressPath,
} from 'ui/constants/paths';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import type { ActionQuery } from '@respite/action';
import type { Address } from '@sns/contracts/user';

// TODO: make this part of respite
export const combineActions = (...actions: Array<ActionQuery<any>>) => {
  return {
    status: actions.reduce(
      (status, action) => (status === Status.IDLE ? action.status : status),
      Status.IDLE,
    ),
    error: actions.reduce(
      (error, action) => (error == null ? action.error : error),
      undefined,
    ),
    submitting: actions.reduce(
      (submitting, action) => submitting || action.submitting,
      false,
    ),
    reset: () => actions.forEach((action) => action.reset()),
  };
};

export default function BillingAddress() {
  useAuthGuard({ username: true, details: true });
  const getMessage = useGetMessage();
  const { orderId } = useParams<{ orderId: string }>();
  const {
    data: { billingAddress: address },
  } = useMyOrder({ id: orderId });
  const { data: user } = useUser();
  const patchOrderAction = usePatchOrder();
  const patchUserAction = useUpdateUser();
  const { error, reset, status } = combineActions(
    patchOrderAction,
    patchUserAction,
  );
  const { action: patchOrder } = patchOrderAction;
  const { action: patchUser } = patchUserAction;
  const { push } = useHistory();

  const formProps = useForm({
    mode: 'onChange',
    defaultValues: { address, useForDelivery: true },
  });
  const handleSubmit = async (values: {
    address: Address;
    useForDelivery: boolean;
  }) => {
    await patchOrder({
      orderId,
      billingAddress: values.address,
      ...(values.useForDelivery ? { deliveryAddress: values.address } : {}),
    });
    if (!user.address?.line1) {
      await patchUser({
        address: values.address,
      });
    }

    await new Promise((res) => setTimeout(res, 500));

    if (values.useForDelivery) {
      push(makeCheckoutPaymentPath({ orderId }));
    } else {
      push(makeDeliveryAddressPath({ orderId }));
    }
  };

  return (
    <FormProvider {...formProps}>
      <form
        onSubmit={formProps.handleSubmit(handleSubmit)}
        className="flex-grow flex flex-col justify-center lg:items-center"
      >
        <Card
          className="flex-grow flex flex-col md:flex-grow-0 lg:w-2/3 xl:w-1/2"
          title={getMessage(ids.checkout.billingAddress.title)}
        >
          <p className="text-sm text-gray-100">
            {getMessage(ids.checkout.billingAddress.description)}
          </p>
          <FormError error={error} />
          <div className="space-y-8">
            <AddressFields address={address} className="mt-8" />
            <div className="sm:w-1/2 sm:mx-auto">
              <Controller
                name="useForDelivery"
                defaultValue={false}
                render={({
                  field: { ref, ...field },
                  fieldState: { error },
                }) => (
                  <Checkbox
                    {...field}
                    error={error}
                    label={getMessage(
                      ids.checkout.billingAddress.useForDelivery.label,
                    )}
                  />
                )}
              />
            </div>
            <div className="flex justify-center">
              <Submit status={status} reset={reset}>
                {getMessage(ids.checkout.billingAddress.next)}
              </Submit>
            </div>
          </div>
        </Card>
      </form>
    </FormProvider>
  );
}
