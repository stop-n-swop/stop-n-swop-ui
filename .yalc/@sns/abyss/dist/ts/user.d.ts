import { ConflictError, NotFoundError } from "./common";
export declare enum UserErrorCode {
    USERNAME_NOT_UNIQUE = "USERNAME_NOT_UNIQUE",
    USER_NOT_FOUND = "USER_NOT_FOUND"
}
export declare class UsernameNotUniqueError extends ConflictError {
    code: UserErrorCode;
    toString(): string;
}
export declare class UserNotFoundError extends NotFoundError {
    code: UserErrorCode;
    constructor(id: string);
}
