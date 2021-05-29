export declare enum CommonErrorCode {
    UNKNOWN = "UNKNOWN",
    NOT_FOUND = "NOT_FOUND",
    NOT_AUTHORIZED = "NOT_AUTHORIZED",
    CONFLICT = "CONFLICT",
    BAD_REQUEST = "BAD_REQUEST",
    VALIDATION = "VALIDATION"
}
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
    entity: string;
    id: string;
    code: string;
    status: number;
    constructor(entity: string, id: string);
    toString(): string;
    toHttpResponse(): {
        status: number;
        body: {
            code: string;
            id: string;
            entity: string;
        };
    };
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
