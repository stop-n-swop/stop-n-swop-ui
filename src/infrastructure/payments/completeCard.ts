import jpex from 'jpex';
import sdk from 'mangopay-cardregistration-js-kit';
import type { CompleteCard } from 'core/payments';
import type { Config } from 'core/io';

type Sdk = typeof sdk;

jpex.constant<Sdk>(sdk);

jpex.factory<CompleteCard>(
  (config: Config, sdk: Sdk): CompleteCard =>
    ({
      accessKey,
      cardNumber,
      cardRegistrationUrl,
      cvc,
      expiry,
      id,
      preregistrationData,
    }) => {
      return new Promise((res, rej) => {
        /* eslint-disable no-param-reassign */
        sdk.cardRegistration.clientId = config.mango.id;
        sdk.cardRegistration.baseURL = config.mango.url;
        /* eslint-enable no-param-reassign */
        sdk.cardRegistration.init({
          Id: id,
          accessKey,
          cardRegistrationURL: cardRegistrationUrl,
          preregistrationData,
        });
        sdk.cardRegistration.registerCard(
          {
            cardNumber,
            cardExpirationDate: expiry,
            cardCvx: cvc,
            cardType: 'CB_VISA_MASTERCARD',
          },
          (result) => res({ cardId: result.CardId }),
          (err) => rej(err),
        );
      });
    },
);
