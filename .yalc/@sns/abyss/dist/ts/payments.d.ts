import { BadRequestError, NotAuthorisedError, NotFoundError, UnknownError } from "./common";
export declare enum PaymentErrorCode {
    MISSING_REGISTER_FIELDS = "MISSING_REGISTER_FIELDS",
    FAILED_TO_REGISTER = "FAILED_TO_REGISTER",
    BANK_ACCOUNT_FAIL = "BANK_ACCOUNT_FAIL",
    KYC_DOCUMENT_FAILED = "KYC_DOCUMENT_FAILED",
    KYC_PAGE_TOO_SMALL = "KYC_PAGE_TOO_SMALL",
    KYC_PAGE_FAILED = "KYC_PAGE_FAILED",
    KYC_SUBMIT_FAILED = "KYC_SUBMIT_FAILED",
    PAYMENT_FAILED = "PAYMENT_FAILED",
    INVALID_CARD_NUMBER = "M105101",
    INVALID_CARD_NAME = "M105102",
    DO_NOT_HONOUR = "M101101",
    INACTIVE_CARD = "M101106",
    MAX_CARD_ATTEMPTS = "M101111",
    TRANSACTION_REFUSED = "M101199",
    "3DSECURE_SESSION_EXPIRED" = "M101304",
    "3DSECURE_FAILED" = "M101301",
    CARD_NUMBER_FORMAT = "M105202",
    PAST_EXPIRY_DATE = "M105203",
    TXN_NOT_FOUND = "TXN_NOT_FOUND",
    PAY_OUT_NOT_READY = "PAY_OUT_NOT_READY"
}
export declare class MissingRegisterFieldsError extends BadRequestError {
    code: PaymentErrorCode;
    toString(): string;
}
export declare class FailedToRegisterError extends UnknownError {
    code: PaymentErrorCode;
    toString(): string;
}
export declare class BankAccountFailError extends UnknownError {
    code: PaymentErrorCode;
}
export declare class KycDocumentFailedError extends UnknownError {
    code: PaymentErrorCode;
}
export declare class KycPageTooSmallError extends BadRequestError {
    code: PaymentErrorCode;
    toString(): string;
}
export declare class KycPageFailedError extends UnknownError {
    code: PaymentErrorCode;
}
export declare class KycSubmitFailedError extends UnknownError {
    code: PaymentErrorCode;
}
export declare class PaymentFailedError extends UnknownError {
    code: PaymentErrorCode;
    toString(): string;
}
export declare class InvalidCardNumberError extends BadRequestError {
    code: PaymentErrorCode;
    toString(): string;
}
export declare class InvalidCardNameError extends BadRequestError {
    code: PaymentErrorCode;
    toString(): string;
}
export declare class DoNotHonourError extends BadRequestError {
    code: PaymentErrorCode;
    toString(): string;
}
export declare class InvactiveCardError extends BadRequestError {
    code: PaymentErrorCode;
    toString(): string;
}
export declare class MaxCardAttemptsError extends BadRequestError {
    code: PaymentErrorCode;
    toString(): string;
}
export declare class TransactionRefusedError extends BadRequestError {
    code: PaymentErrorCode;
    toString(): string;
}
export declare class ThreeDSecureSessionExpiredError extends NotAuthorisedError {
    code: PaymentErrorCode;
    toString(): string;
}
export declare class ThreeDSecureFailedError extends UnknownError {
    code: PaymentErrorCode;
    toString(): string;
}
export declare class CardNumberFormatError extends BadRequestError {
    code: PaymentErrorCode;
    toString(): string;
}
export declare class PastExpryDateError extends BadRequestError {
    code: PaymentErrorCode;
    toString(): string;
}
export declare class TxnNotFoundError extends NotFoundError {
    code: PaymentErrorCode;
    constructor(id: string);
}
export declare class PayOutNotReadyError extends BadRequestError {
    constructor();
    toString(): string;
}
