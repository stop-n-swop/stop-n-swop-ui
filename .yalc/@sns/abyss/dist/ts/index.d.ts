export interface IError {
    code: string;
    status: number;
    toHttpResponse(): {
        status: number;
        body: {
            code: string;
        };
    };
    toString(): string;
}
export declare abstract class BaseError extends Error implements IError {
    code: string;
    status: number;
    toHttpResponse(): {
        status: number;
        body: {
            code: string;
        };
    };
    toString(): string;
}
export declare class UnknownError extends BaseError {
}
export declare class NotFoundError extends BaseError {
    code: string;
    status: number;
    toString(): string;
}
export declare class NotAuthorisedError extends BaseError {
    code: string;
    status: number;
    toString(): string;
}
export declare class ConflictError extends BaseError {
    code: string;
    status: number;
    toString(): string;
}
export declare class BadRequestError extends BaseError {
    code: string;
    status: number;
    toString(): string;
}
export declare class UsernameNotUniqueError extends ConflictError {
    code: string;
    toString(): string;
}
export declare class InvalidLoginError extends BadRequestError {
    code: string;
    toString(): string;
}
export declare class InvalidTokenError extends NotAuthorisedError {
    code: string;
}
export declare class OutdatedTokenError extends NotAuthorisedError {
    code: string;
}
export declare class UserNotFoundError extends NotFoundError {
    code: string;
    toString(): string;
}
export declare class ValidationError extends BadRequestError {
    errors: Record<string, string>;
    code: string;
    constructor(errors: Record<string, string>);
    toHttpResponse(): {
        status: number;
        body: {
            code: string;
            errors: Record<string, string>;
        };
    };
    toString(): string;
}
export declare class UploadFailedError extends UnknownError {
    code: string;
    toString(): string;
}
export declare const responseToError: (response: {
    status: number;
    error: Record<string, any>;
}) => UnknownError | NotFoundError | NotAuthorisedError | ConflictError | BadRequestError;
