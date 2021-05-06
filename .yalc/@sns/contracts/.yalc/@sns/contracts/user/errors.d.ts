import { UserInputError, ConflictError, NotAuthorisedError, NotFoundError } from "@sns/contracts/common";
export declare enum UserCode {
    NOT_UNIQUE = 200,
    INVALID_LOGIN = 201,
    INVALID_TOKEN = 202,
    OUTDATED_TOKEN = 203,
    NOT_FOUND = 204,
    EMAIL_NOT_UNIQUE = 205
}
export declare class UsernameNotUniqueError extends ConflictError {
    code: number;
}
export declare class EmailNotUniqueError extends ConflictError {
    code: number;
}
export declare class InvalidUsernamePassword extends UserInputError {
    code: number;
    constructor(message?: string);
}
export declare class InvalidTokenError extends NotAuthorisedError {
    code: number;
}
export declare class OutdatedTokenError extends NotAuthorisedError {
    code: number;
}
export declare class UserNotFoundError extends NotFoundError {
    code: number;
}
