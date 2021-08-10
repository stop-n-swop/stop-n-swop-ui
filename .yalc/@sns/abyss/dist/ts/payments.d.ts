import { BadRequestError } from "./common";
export declare enum PaymentErrorCode {
    PAY_OUT_NOT_READY = "PAY_OUT_NOT_READY"
}
export declare class PayOutNotReadyError extends BadRequestError {
    constructor();
    toString(): string;
}
