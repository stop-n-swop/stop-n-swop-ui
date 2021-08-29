import { ReactNode, useCallback, useContext, useMemo } from 'react';
import { useResolve } from 'react-jpex';
import { context } from './context';

export const useGetMessage = () => {
  const { warn } = useResolve<Console>();
  const { messages } = useContext(context);

  return useCallback(
    <R extends string | ReactNode = string>(
      id: string,
      values?: Record<string, any>,
    ): R => {
      const message = messages[id];
      let hasJsx = false;

      if (message == null) {
        if (process.env.NODE_ENV !== 'production') {
          warn(`Could not find a message for id ${id}`);
        }
        return id as unknown as R;
      }

      let parts = [message];
      if (message && values && message.includes('{')) {
        parts = message.split(/[{}]/).map((part, i) => {
          if (i % 2 === 0) {
            return part;
          }

          const value = values[part];
          if (value) {
            if (typeof value === 'object') {
              hasJsx = true;
            }
            return value;
          }
          // eslint-disable-next-line no-new-func
          const fn = new Function('props', `with(props) { return ${part} }`);
          const result = fn(values);
          if (typeof result === 'object') {
            hasJsx = true;
          }
          return result;
        });
      }

      const result = (hasJsx ? parts : parts.join('')) as unknown as R;

      return result;
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
      return getNumber(number / 100, {
        style: 'currency',
        currency,
        ...opts,
      });
    },
    [currency, getNumber],
  );
};

export const useGetCurrencySymbol = () => {
  const getCurrency = useGetCurrency();

  return useCallback(
    (opts?: Intl.NumberFormatOptions) => {
      const str = getCurrency(0, opts);
      return str.replace(/[\d.]/g, '');
    },
    [getCurrency],
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

  return useMemo(
    () => ({ message, currency, number, date }),
    [currency, date, message, number],
  );
};

export type IntlShape = ReturnType<typeof useIntl>;
