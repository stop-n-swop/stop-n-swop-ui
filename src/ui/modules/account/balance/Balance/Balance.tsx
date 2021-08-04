import React, { useEffect, useState } from 'react';
import Button from 'ui/elements/Button';
import { FaCheck, FaPiggyBank, FaTimes } from 'react-icons/fa';
import { useGetCurrency, useGetMessage } from 'ui/intl';
import { useTransition, config, animated } from 'react-spring';
import { CurrencyInput } from 'ui/elements/Input';
import { Status } from '@respite/core';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import FieldError from 'ui/elements/FieldError';
import { ids } from 'ui/messages';
import { hasPayOutPermissions } from 'domain/selectors/user';
import { MIN_WITHDRAWAL_AMOUNT } from 'domain/constants/payments';
import type { User } from '@sns/contracts/user';

const getButtonState = (status: Status) => {
  if (status === Status.LOADING) {
    return 'pending';
  }
  if (status === Status.SUCCESS) {
    return 'success';
  }
  return undefined;
};

export default function Balance({
  user,
  balance,
  currency,
  status,
  onSubmit,
}: {
  user: User;
  balance: number;
  currency: string;
  status: Status;
  onSubmit(values: { amount: number }): any;
}) {
  const g = useGetMessage();
  const getCurrency = useGetCurrency();
  const transitions = useTransition(balance, (balance) => balance, {
    from: { opacity: 0, transform: `translate3d(0, 100px, 100px)` },
    enter: { opacity: 1, transform: 'translate3d(0, 0px, 0)' },
    initial: { opacity: 1, transform: 'translate3d(0, 0px, 0)' },
    leave: {
      opacity: 0,
      transform: 'translate3d(0,-100px,-100px)',
      position: 'absolute',
    },
    delay: 200,
    config: config.gentle,
  });
  const canWithdraw =
    hasPayOutPermissions(user) && balance >= MIN_WITHDRAWAL_AMOUNT;
  const [editing, setEditing] = useState(false);
  const formProps = useForm<{ amount: number }>({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
  });
  const {
    formState: {
      errors: { amount: error },
    },
    reset,
  } = formProps;

  useEffect(() => {
    reset({ amount: balance });
  }, [balance, reset]);

  const handleSubmit = formProps.handleSubmit(async (values) => {
    setEditing(false);
    await onSubmit(values);
  });
  return (
    <FormProvider {...formProps}>
      <div className="flex flex-col md:flex-row items-center justify-between font-retro text-sm">
        <div className="text-xs flex-shrink-0">
          {g(ids.account.balance.balance.label)}
        </div>
        <div className="text-2xl font-bold">
          {transitions.map(({ item, props, key }) => (
            <animated.div style={props} key={key} className="md:right-0">
              <Choose>
                <When condition={editing && false}>
                  <Controller
                    name="amount"
                    defaultValue={balance}
                    rules={{
                      required: g(ids.account.balance.balance.required),
                      min: {
                        value: MIN_WITHDRAWAL_AMOUNT,
                        message: g(ids.account.balance.balance.min, {
                          min: getCurrency(500, {
                            currency,
                            maximumFractionDigits: 0,
                          }),
                        }),
                      },
                      max: {
                        value: balance,
                        message: g(ids.account.balance.balance.max),
                      },
                    }}
                    render={({ field: { ref, ...field } }) => (
                      <CurrencyInput
                        id="withdraw_amount"
                        autoFocus
                        min={5}
                        max={balance / 100}
                        {...field}
                      />
                    )}
                  />
                </When>
                <Otherwise>{getCurrency(item, { currency })}</Otherwise>
              </Choose>
            </animated.div>
          ))}
        </div>
      </div>
      <If condition={error}>
        <div className="w-96">
          <FieldError error={error} />
        </div>
      </If>
      <Choose>
        <When condition={editing}>
          <div className="flex justify-around md:justify-between">
            <Button kind="primary" onClick={handleSubmit} className="space-x-4">
              <FaCheck />
              <span>{g(ids.account.balance.balance.confirm)}</span>
            </Button>
            <Button
              kind="tertiary"
              onClick={() => setEditing(false)}
              className="space-x-4"
            >
              <FaTimes />
              <span>{g(ids.account.balance.balance.cancel)}</span>
            </Button>
          </div>
        </When>
        <When condition={canWithdraw}>
          <div className="flex justify-center md:justify-end">
            <Button
              kind="primary"
              onClick={() => setEditing(true)}
              className="space-x-4"
              state={getButtonState(status)}
            >
              <FaPiggyBank />
              <span>{g(ids.account.balance.balance.withdraw)}</span>
            </Button>
          </div>
        </When>
      </Choose>
      <If condition={status === Status.SUCCESS}>
        <p className="text-sm italic">
          {g(ids.account.balance.balance.completed)}
        </p>
      </If>
    </FormProvider>
  );
}
