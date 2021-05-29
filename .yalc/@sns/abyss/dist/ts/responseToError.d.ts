import { BadRequestError, ConflictError, NotAuthorisedError, NotFoundError, UnknownError } from "./common";
export declare const responseToError: (response: {
    status: number;
    error: Record<string, any>;
}) => UnknownError | NotFoundError | NotAuthorisedError | ConflictError | BadRequestError;
