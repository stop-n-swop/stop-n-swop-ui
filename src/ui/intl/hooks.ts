import { useCallback, useContext, useMemo } from 'react';
import { useResolve } from 'react-jpex';
import { context } from './context';

export const useGetMessage = () => {
  const { warn } = useResolve<Console>();
  const { messages } = useContext(context);

  return useCallback(
    (id: string, values?: Record<string, any>) => {
      let message = messages[id];
      if (message && values && message.includes('{')) {
        message = Object.entries(values).reduce((message, [key, value]) => {
          return message.replace(`{${key}}`, value);
        }, message);
      }

      if (process.env.NODE_ENV !== 'production' && message == null) {
        warn(`Could not find a message for id ${id}`);
      }

      return message ?? id;
    },
    [messages, warn],
  );
};

export const useMessage = (id: string, values?: Record<string, any>) =>
  useGetMessage()(id, values);

export const useGetNumber = () => {
  const { locale } = useContext(context);
  return useCallback(
    (number: number, opts?: Intl.NumberFormatOptions) => {
      const intl = new Intl.NumberFormat(locale, opts);
      return intl.format(number);
    },
    [locale],
  );
};

export const useNumber = (number: number, opts?: Intl.NumberFormatOptions) =>
  useGetNumber()(number, opts);

export const useGetCurrency = () => {
  const { currency } = useContext(context);
  const getNumber = useGetNumber();
  return useCallback(
    (number: number, opts?: Intl.NumberFormatOptions) => {
      return getNumber(number, {
        style: 'currency',
        currency,
        ...opts,
      });
    },
    [currency, getNumber],
  );
};

export const useCurrency = (number: number, opts?: Intl.NumberFormatOptions) =>
  useGetCurrency()(number, opts);

export const useGetDate = () => {
  const { locale } = useContext(context);
  return useCallback(
    (date: Date | string, opts?: Intl.DateTimeFormatOptions) => {
      if (typeof date === 'string') {
        // eslint-disable-next-line no-param-reassign
        date = new Date(date);
      }
      const intl = new Intl.DateTimeFormat(locale, opts);
      return intl.format(date);
    },
    [locale],
  );
};

export const useDate = (
  date: Date | string,
  opts?: Intl.DateTimeFormatOptions,
) => useGetDate()(date, opts);

export const useIntl = () => {
  const message = useGetMessage();
  const currency = useGetCurrency();
  const number = useGetNumber();
  const date = useGetDate();

  return useMemo(() => ({ message, currency, number, date }), [
    currency,
    date,
    message,
    number,
  ]);
};

export type IntlShape = ReturnType<typeof useIntl>;
