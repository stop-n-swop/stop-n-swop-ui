export declare enum CommonCode {
    NOT_FOUND = 100,
    NOT_AUTHORIZED = 101,
    VALIDATION = 102,
    CONFLICT = 103,
    BAD_REQUEST = 104
}
export declare class NotFoundError extends Error {
    code: number;
}
export declare class NotAuthorisedError extends Error {
    code: number;
}
export declare class ConflictError extends Error {
    code: number;
}
export declare class UserInputError extends Error {
    code: number;
}
