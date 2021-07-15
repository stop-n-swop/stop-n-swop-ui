declare module 'mangopay-cardregistration-js-kit' {
  const cardRegistration: {
    baseURL: string;
    clientId: string;

    init(args: {
      cardRegistrationURL: string;
      preregistrationData: string;
      accessKey: string;
      Id: string;
    }): void;

    registerCard(
      cardData: {
        cardNumber: string;
        cardExpirationDate: string;
        cardCvx: string;
        cardType: string;
      },
      success: (res: { CardId: string }) => void,
      failure: (res: { ResultCode: string; ResultMessage: string }) => void,
    ): void;
  };
}
