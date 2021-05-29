import { NotFoundError, UnknownError } from "./common";
export declare enum ListingErrorCode {
    CREATE_LISTING = "CREATE_LISTING",
    LISTING_NOT_FOUND = "LISTING_NOT_FOUND"
}
export declare class CreateListingError extends UnknownError {
    code: ListingErrorCode;
    toString(): string;
}
export declare class ListingNotFoundError extends NotFoundError {
    code: ListingErrorCode;
    constructor(id: string);
}
