import React from 'react';
import { FaLock } from 'react-icons/fa';
import Input, { InputController } from 'ui/elements/Input';
import banner from 'ui/assets/powered-by-mangopay.png';
import Submit from 'ui/elements/Submit';
import { CheckboxController } from 'ui/elements/check';
import Card from 'ui/elements/Card';
import { getFinalPrice, Listing } from '@sns/contracts/listing';
import { useGetCurrency, useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import FormError from 'ui/elements/FormError';
import CardInput from '../CardInput';
import ExpiryInput from '../ExpiryInput';
import SecurityInput from '../SecurityInput';
import type { User } from '@sns/contracts/user';
import type { Status } from '@respite/core';

export default function CardScreen({
  user,
  listing,
  onSubmit,
  error,
  status,
}: {
  error: any;
  status: Status;
  user: User;
  listing: Listing;
  onSubmit(values: any): any;
}) {
  const defaultName = [user.firstName, user.lastName].filter(Boolean).join(' ');
  const getCurrency = useGetCurrency();
  const g = useGetMessage();

  return (
    <form
      onSubmit={onSubmit}
      className="flex-grow flex justify-center items-center"
    >
      <Card
        title={g(ids.checkout.payment.title)}
        className="max-w-screen-sm mx-auto"
      >
        <div className="flex flex-col items-center">
          <div className="space-y-12 w-96">
            <If condition={error}>
              <div className="mb-10">
                <FormError error={error} />
              </div>
            </If>
            <div>
              <Input
                name="name"
                id="name"
                label={g(ids.checkout.payment.name.label)}
                value={defaultName}
                onChange={() => null}
                disabled
              />
            </div>
            <div>
              <InputController
                name="cardNumber"
                id="cardNumber"
                defaultValue=""
                Input={CardInput}
                label={g(ids.checkout.payment.cardNumber.label)}
                rules={{
                  required: g(ids.checkout.payment.cardNumber.required),
                  maxLength: {
                    value: 16,
                    message: g(ids.checkout.payment.cardNumber.length, {
                      length: 16,
                    }),
                  },
                  minLength: {
                    value: 16,
                    message: g(ids.checkout.payment.cardNumber.length, {
                      length: 16,
                    }),
                  },
                }}
              />
            </div>
            <div className="flex space-x-12j">
              <div className="w-1/2">
                <InputController
                  name="expiry"
                  id="expiry"
                  defaultValue=""
                  Input={ExpiryInput}
                  label={g(ids.checkout.payment.expiry.label)}
                  rules={{
                    required: g(ids.checkout.payment.expiry.required),
                    minLength: {
                      value: 4,
                      message: g(ids.checkout.payment.expiry.length, {
                        length: 4,
                      }),
                    },
                    maxLength: {
                      value: 4,
                      message: g(ids.checkout.payment.expiry.length, {
                        length: 4,
                      }),
                    },
                  }}
                />
              </div>
              <div className="w-12">
                <InputController
                  id="cvc"
                  defaultValue=""
                  label={g(ids.checkout.payment.cvc.label)}
                  name="cvc"
                  rules={{
                    required: g(ids.checkout.payment.cvc.required, {
                      length: 3,
                    }),
                    minLength: {
                      value: 3,
                      message: g(ids.checkout.payment.cvc.required, {
                        length: 3,
                      }),
                    },
                    maxLength: {
                      value: 3,
                      message: g(ids.checkout.payment.cvc.required, {
                        length: 3,
                      }),
                    },
                  }}
                  Input={SecurityInput}
                />
              </div>
            </div>
            <div>
              <CheckboxController
                name="remember"
                defaultValue
                label={g(ids.checkout.payment.remember.label)}
              />
            </div>
            <div>
              <Submit className="w-full space-x-4" status={status}>
                <FaLock />
                <span>
                  {g(ids.checkout.payment.submit, {
                    amount: getCurrency(getFinalPrice(listing), {
                      currency: listing.currency,
                    }),
                  })}
                </span>
              </Submit>
            </div>
          </div>
        </div>
        <div className="mt-32">
          <img alt="Powered by MangoPay" src={banner} />
        </div>
      </Card>
    </form>
  );
}
