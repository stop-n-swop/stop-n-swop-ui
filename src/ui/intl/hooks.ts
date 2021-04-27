import { useContext } from 'react';
import { useResolve } from 'react-jpex';
import { context } from './context';

// TODO: memoize

export const useGetMessage = () => {
  const { warn } = useResolve<Console>();
  const { messages } = useContext(context);
  return (id: string, values?: Record<string, any>) => {
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
  };
};

export const useMessage = (id: string, values?: Record<string, any>) =>
  useGetMessage()(id, values);

export const useGetNumber = () => {
  const { locale } = useContext(context);
  return (number: number, opts?: Intl.NumberFormatOptions) => {
    const intl = new Intl.NumberFormat(locale, opts);
    return intl.format(number);
  };
};

export const useNumber = (number: number, opts?: Intl.NumberFormatOptions) =>
  useGetNumber()(number, opts);

export const useGetCurrency = () => {
  const { currency } = useContext(context);
  const getNumber = useGetNumber();
  return (number: number, opts?: Intl.NumberFormatOptions) => {
    return getNumber(number, {
      style: 'currency',
      currency,
      ...opts,
    });
  };
};

export const useCurrency = (number: number, opts?: Intl.NumberFormatOptions) =>
  useGetCurrency()(number, opts);

export const useGetDate = () => {
  const { locale } = useContext(context);
  return (date: Date, opts?: Intl.DateTimeFormatOptions) => {
    const intl = new Intl.DateTimeFormat(locale, opts);
    return intl.format(date);
  };
};

export const useDate = (date: Date, opts?: Intl.DateTimeFormatOptions) =>
  useGetDate()(date, opts);

export const useIntl = () => {
  const message = useGetMessage();
  const currency = useGetCurrency();
  const number = useGetNumber();
  const date = useGetDate();

  return { message, currency, number, date };
};

export type IntlShape = ReturnType<typeof useIntl>;
